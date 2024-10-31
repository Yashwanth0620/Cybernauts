import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="link" href="/">Home</Link>
      <p href="#">|</p>
      <Link to="/events" className="link" href="events.js">Events</Link>
      <p href="#">|</p>
      <Link to="/members" className="link" href="Members.js">Members</Link>
      <p href="#">|</p>
      <Link to="/blog" className="link" href="Blog.js">Blog</Link>
      <p href="#">|</p>
      <Link to="/contactus" className="link" href="contLinkct.js">Contact</Link>
    </nav>
  );
}
