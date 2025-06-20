import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";


function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // This will hold either a string path or a preview URL
  const [imageFile, setImageFile] = useState(null); // The actual file object if changed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL;

  // Load post data
  useEffect(() => {
    axios
      .get(`${apiBase}/api/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImageUrl(res.data.image || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  // Cleanup the preview URL on unmount or when imageFile changes
  useEffect(() => {
    return () => {
      // Only revoke if imageUrl was created by URL.createObjectURL
      if (imageFile && imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageFile, imageUrl]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Revoke previous preview URL if exists
      if (imageFile && imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      const file = e.target.files[0];
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImageUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (imageFile) {
        formData.append("image", imageFile);
      }
      // If no new image, do not append 'image', backend keeps old one

      await axios.put(`${apiBase}/api/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/post/${id}`);
    } catch (err) {
      setError("Failed to update post");
      console.error(err);
    }
  };

  if (loading) return <p>Loading post data...</p>;
  if (error) return <p>{error}</p>;

  // Use full URL for backend images, or preview URL for new image
  const displayImage = imageUrl
    ? imageUrl.startsWith("blob:")
      ? imageUrl // preview URL from createObjectURL already complete
      : imageUrl.startsWith("http")
      ? imageUrl
      : `${apiBase}${imageUrl}`
    : null;

  return (
    <>
    <Navbar />
    <section id="create-post" className="container my-5">
      <h2>Edit post</h2>
      <br />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="post-title"
            placeholder="Weather today..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="post-description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            id="post-description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <label htmlFor="image" className="form-label">
          Update image
        </label>
        <br />
        {displayImage && (
          <img
            src={displayImage}
            alt="Current"
            style={{ maxWidth: "200px", marginBottom: "10px" }}
          />
        )}
        <br />
        <input
          name="image"
          type="file"
          className="form-label"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />

        <div className="centred-button mt-4">
          <button type="submit" className="btn btn-dark">
            Edit
          </button>
        </div>
      </form>
    </section></>
  );
}

export default EditPost;
