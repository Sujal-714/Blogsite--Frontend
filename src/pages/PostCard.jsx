import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Nav } from "react-bootstrap";
import apiBase from "../utils/apiBase";
const PostCardDetails = ({ onDeleteSuccess }) => {
  const { id } = useParams();           // get id from URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post details by id when component mounts or id changes
    axios
      .get(`${apiBase}/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        // Optionally navigate back if post not found
        navigate("/");
      });
  }, [id, navigate]);

  const handleEdit = () => {
    if (post) {
      navigate(`/edit/${post.id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure?") && post) {
      try {
        await axios.delete(`${apiBase}/api/posts/${post.id}`);
        if (onDeleteSuccess) onDeleteSuccess(post.id);
        navigate("/"); // Redirect after delete
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (!post) {
    return <p>Loading post details...</p>;
  }

  return (
    <>
    <Navbar />
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        {post.image && (
          <img
            src={`${apiBase}${post.image}`}
            className="post-img img-fluid mb-3"
            alt="Post"
          />
        )}
        <h3 className="text-body-emphasis">{post.title}</h3>
        <p className="col-lg-8 mx-auto fs-5 text-muted">{post.description}</p>
        <div className="d-inline-flex gap-2 mb-5">
          <button
            onClick={handleEdit}
            className="edt-btn d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
          >
            Edit 
            { <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'><title>pencil_line</title><g id="pencil_line" fill='none'><path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/><path fill='#FFFFFFFF' d='M16.035 3.015a3 3 0 0 1 4.099-.135l.144.135.707.707a3 3 0 0 1 .135 4.098l-.135.144L9.773 19.177a1.5 1.5 0 0 1-.562.354l-.162.047-4.454 1.028a1.001 1.001 0 0 1-1.22-1.088l.02-.113 1.027-4.455a1.5 1.5 0 0 1 .29-.598l.111-.125zm-.707 3.535-8.99 8.99-.636 2.758 2.758-.637 8.99-8.99-2.122-2.12Zm3.536-2.121a1 1 0 0 0-1.32-.083l-.094.083-.708.707 2.122 2.121.707-.707a1 1 0 0 0 .083-1.32l-.083-.094z'/></g></svg>
}
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn btn btn-outline-secondary btn-lg px-4 rounded-pill"
          >
            Delete  
                 {<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24'><title>delete_3_line</title><g id="delete_3_line" fill='none' fill-rule='evenodd'><path d='M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z'/><path fill='#09244BFF' d='M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2.72-3H9.72l-.333 1h5.226z'/></g></svg>
} 
          </button>
        </div>
      </div>
    </div></>
  );
};

export default PostCardDetails;
