import React from "react";
import "./styles/Blog.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const BlogPage = () => {
  const navigate = useNavigate();

  const {role} = useAuth();
  const isAdmin = role === "admin";

  const blogPosts = [
    {
      title: "Conducted a hackathon",
      content:
        "We did something which resulted in something. Something Something some Something Something Something Something Something Something v Something Something. We did something which resulted in something.",
      date: "18th Oct 2024",
      image:
        "https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/65e80f722774b7ae68fbecdb_samantha-gades-fIHozNWfcvs-unsplash%20(1).jpg?w=1600",
    },
    {
      title: "Exploring AI Innovations",
      content:
        "A deep dive into the latest advancements in AI technology and its implications for the future.",
      date: "15th Oct 2024",
      image:
        "https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/65e80f722774b7ae68fbecdb_samantha-gades-fIHozNWfcvs-unsplash%20(1).jpg?w=1600",
    },
    {
      title: "Community Engagement Initiatives",
      content:
        "Our recent efforts in community service and engagement to foster a stronger connection with the local community.",
      date: "10th Oct 2024",
      image:
        "https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/65e80f722774b7ae68fbecdb_samantha-gades-fIHozNWfcvs-unsplash%20(1).jpg?w=1600",
    },
  ];
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
          {isAdmin && (<button className="head-btn" onClick={openBlogForm}>
            Add Blog
          </button>)}
        </div>
        {/* Blog Posts */}
        {blogPosts.map((post, index) => (
          <div className="blog-post" key={index}>
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content} </p>
              <span className="date">{post.date}</span>
            </div>
            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogPage;
