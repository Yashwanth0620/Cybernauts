import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";
import { useAuth } from "../AuthContext";

export default function NavBar() {

  const [links, setLinks] = useState();

  const {role} = useAuth();
  
  useEffect(() => {
    const sm = window.innerWidth > 670;
    setLinks(sm);
  }, [])

  return (
    <nav className="nav-bar">
      <div className="bars">
        <img src={require('../assets/logo.png')} alt="Cybernauts logo"></img>
        <div onClick={() => setLinks(!links)} className="bar"><i className="fa-solid fa-bars"></i></div>
      </div>
      {links ? (<>
        <Link to="/" className="link" href="/">Home</Link>
        <p href="#">|</p>
        <Link to="/events" className="link" href="events.js">Events</Link>
        <p href="#">|</p>
        <Link to={role === "admin" ? "/admin/view-members" : "/members"} className="link" href="Members.js">Members</Link>
        <p href="#">|</p>
        <Link to="/blog" className="link">Blog</Link>
        <p href="#">|</p>
        <Link to="/contactus" className="link" href="contLinkct.js">Contact</Link>
      </>) : ""}

    </nav>
  );
}
