import React from 'react';
import './styles/Blog.css';

const BlogPage = () => {
    
    const blogPosts = [
        {
            title: "Conducted a hackathon",
            content: "We did something which resulted in something. Something Something some Something Something Something Something Something Something v Something Something. We did something which resulted in something.",
            date: "18th Oct 2024",
            image: "https://news.microsoft.com/wp-content/uploads/prod/sites/45/2019/07/Teamshacking@Microsoft2019hackathon_-960x630.jpg"
        },
        {
            title: "Exploring AI Innovations",
            content: "A deep dive into the latest advancements in AI technology and its implications for the future.",
            date: "15th Oct 2024",
            image: "https://news.microsoft.com/wp-content/uploads/prod/sites/45/2019/07/Teamshacking@Microsoft2019hackathon_-960x630.jpg" 
        },
        {
            title: "Community Engagement Initiatives",
            content: "Our recent efforts in community service and engagement to foster a stronger connection with the local community.",
            date: "10th Oct 2024",
            image: "https://news.microsoft.com/wp-content/uploads/prod/sites/45/2019/07/Teamshacking@Microsoft2019hackathon_-960x630.jpg" 
        }
    ];

    return (
        <div>

            {/* Blog Section */}
            <section className="blog-section">
                <h2>Blog</h2>
                <p>Stay informed with what we do...</p>

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
}

export default BlogPage;
