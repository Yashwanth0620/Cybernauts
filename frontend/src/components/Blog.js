import React, { useEffect, useState } from "react";
import "./styles/Blog.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const BlogPage = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_URI}:3001/blogs`);
        setBlogPosts(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const openBlogForm = () => {
    navigate("/admin/add-blog");
  };

  return (
    <div>
      {/* Blog Section */}
      <section className="blog-section">
        <div className="blog-head">
          <div className="blog-sectiontext">
            <h2>Blog</h2>
            <p>Stay informed with what we do...</p>
          </div>
          {isAdmin && (
            <button className="head-btn" onClick={openBlogForm}>
              Add Blog
            </button>
          )}
        </div>
        {/* Blog Posts */}
        {blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <div className="blog-post" key={index}>
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="date">{post.date}</span>
              </div>
              <div className="post-image">
                <img src={post.image} alt={post.title} />
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
