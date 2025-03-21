import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";
import { useAuth } from "../AuthContext";

export default function NavBar() {
  const [links, setLinks] = useState();
  const navigate = useNavigate();

  const { role } = useAuth();

  const sm = window.innerWidth > 1050;
  useEffect(() => {
    setLinks(sm);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");

    window.open("/", "_self");
    return;
  };

  return (
    <nav className="nav-bar">
      <div className="bars">
        <img src={require("../assets/logo.png")} alt="Cybernauts logo"></img>
        <div onClick={() => setLinks(!links)} className="bar">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      {links ? (
        <>
          <Link
            onClick={() => {if(!sm) setLinks(false)  }}
            to="/"
            className="link"
            href="/"
          >
            Home
          </Link>
          <p href="#">|</p>
          <Link
            onClick={() => {if(!sm) setLinks(false)}}
            to="/events"
            className="link"
            href="events.js"
          >
            Events
          </Link>
          <p href="#">|</p>
          <Link
            onClick={() => {if(!sm) setLinks(false)}}
            to={role === "admin" ? "/admin/view-members" : "/members"}
            className="link"
            href="Members.js"
          >
            Members
          </Link>
          <p href="#">|</p>
          <Link onClick={() => {if(!sm) setLinks(false)}} to="/blog" className="link">
            Blog
          </Link>
          <p href="#">|</p>
          <Link
            onClick={() => {if(!sm) setLinks(false)}}
            to="/contactus"
            className="link"
            href="contLinkct.js"
          >
            Contact
          </Link>
          {!!role && (
            <>
              <p href="#">|</p>
              <Link
                onClick={() => {if(!sm) setLinks(false)}}
                to="/announcement"
                className="link"
              >
                Announcement
              </Link>
            </>
          )}
          {role === "superadmin" && (
            <>
              <p href="#">|</p>
              <Link
                onClick={() => {if(!sm) setLinks(false)}}
                to="/superadmin"
                className="link"
              >
                Admin Controls
              </Link>
            </>
          )}
          {!!role && (
            <>
              <Link
                onClick={() => {
                  handleLogout();
                  {if(!sm) setLinks(false)};
                }}
                id="logout-btn"
                className="link"
              >
                Logout
              </Link>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </nav>
  );
}
