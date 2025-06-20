import React from "react";
import { Link } from "react-router-dom"; // Optional, for SPA routing

function PostGrid({ posts }) {
  const apiBase = import.meta.env.VITE_API_URL;
  return (
    <section className="container mt-4">
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-12 col-sm-6 col-md-4" key={post.id}>
            <Link
              to={`/post/${post.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 d-flex flex-column">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt="post"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostGrid;
