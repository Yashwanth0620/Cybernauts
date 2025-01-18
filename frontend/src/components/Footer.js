import React from 'react'
import "./styles/Footer.css"

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img
            className="a"
            src={require("../assets/logo.png")}
            alt="Cybernauts Logo"
          />
          <p>Pioneering the Future of Technology.</p>
        </div>
        <div className="sidebar">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="events">Events</a></li>
            <li><a href="members">Members</a></li>
            <li><a href="blog">Blog</a></li>
            <li><a href="contactus">Contact us</a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h4>Get in touch with us</h4>
          <p>Mail us at cybernauts@gmail.com</p>
          <p>📞 +91 22222 33333 | +91 88888 77777</p>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bi bi-instagram"></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="bi bi-twitter"></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="bi bi-linkedin"></a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="bi bi-whatsapp"></a>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>&copy; 2024 Cybernauts. All Rights Reserved</p>
    </footer>
  )
}
