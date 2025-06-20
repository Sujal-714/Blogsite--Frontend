import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImage(file);  // Save file for form data
  setPreview(URL.createObjectURL(file)); // Show preview
};


const handleRemoveImage = () => {
  setImage(null);
  setPreview(null);
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const res = await axios.post("http://localhost:3000/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Post created!");
 

    // Reset
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    navigate("/");
  } catch (err) {
    console.error("Error creating post:", err);
    alert("Failed to create post");
  }
};


  return (
    <>
      <Navbar />
    <section className="container mt-5" id="create-post">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Weather today..."
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="post-description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="post-description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">Upload Image</label><br />
          <input
            type="file"
            className="form-label"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="mb-3 text-center">
            <img src={preview} alt="Preview" style={{ height: "200px", width: "auto" }} /><br />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="btn btn-danger btn-sm mt-2"
            >
              Remove Image
            </button>
          </div>
        )}

        <div className="centred-button">
          <button type="submit" className="btn btn-dark">Post</button>
        </div>
      </form>
    </section>
    </>
  );
}

export default CreatePost;
