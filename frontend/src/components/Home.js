import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import banner from "../assets/banner.jpeg";

import { useAuth } from "../AuthContext";

const App = () => {
  const { role } = useAuth();
  const [image, setBanner] = useState(banner);
  const [event, setEvent] = useState({});
  useEffect(() => {
    const getRecentEvent = async () => {
      try {
        const response = await axios.get("http://localhost:3001/events/recent");
        if (response.status === 200) {
          setEvent(response.data);
          setBanner(response.data.images[0]); // Fix: Access response directly
        }
      } catch (error) {
        console.error("Error fetching recent event:", error);
      }
    };

    getRecentEvent();
  }, []);

  return (
    <div className="home">
      {/* Top Header */}
      <header className="top-header">
        <span>📞 +91 77777 88888 | +91 88888 99999</span>
        <a
          href="https://cvr.ac.in/home4/"
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          CVR College of Engineering
        </a>
        {role !== "admin" && (
          <Link to="/admin/login" className="link admin-link">
            Admin?
          </Link>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="logo">
          <img src={require("../assets/logo.png")} alt="Cybernauts logo"></img>
        </div>
        <div>
          <h1>CYBERNAUTS</h1>
          <p>{event?.title || "Recent Event"}</p>
          <h5>{event?.endDate?.substring(0, 10) || "Date"}</h5>

          <h4>
            <i>
              {event?.desc?.length > 50
                ? event.desc.substring(0, 50) + "..."
                : event?.desc || "Innovating the future of Technology"}
            </i>
          </h4>
          <div className="highlight-btn">
            <button>
              <Link to="events">View Event Highlights</Link>
            </button>
          </div>
        </div>
      </section>

      <NavBar largeWidth={window.innerWidth > 670} />

      {/* About Section */}
      <section className="about">
        <h2>About Cybernauts</h2>
        <h3>Empowering Tomorrow's Innovators</h3>
        <div className="about-content">
          <div className="text-content">
            <h4>Who we are</h4>
            <p>
              "A community of passionate CSE students
              <br />
              pushing the boundaries of technology."
              <br />
            </p>
            <h4>Our Mission</h4>
            <p>
              "To foster a collaborative environment <br />
              where students can grow through hands-on <br />
              learning, events, and innovation."
            </p>
          </div>
          <div className="image-content">
            <img
              src="https://fliplet.com/wp-content/w3-webp/uploads/2024/01/What-is-a-hackathon.pngw3.webp"
              alt="Hackathon Event"
            />
          </div>
        </div>
        <button>
          <Link to="members">View our Members</Link>
        </button>
      </section>

      {/* Recent Event Section */}
      <section className="recent-event">
        <h2>What we Do?</h2>
        <h3>Our recent event</h3>
        <div className="event-content">
          <img
            src="https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/65e80f722774b7ae68fbecdb_samantha-gades-fIHozNWfcvs-unsplash%20(1).jpg?w=1600"
            alt="Recent Hackathon Event"
          />
          <h4>
            <strong>{event?.title || "Recent Event"}</strong>
          </h4>
          <p>
            {event
              ? `${event.title} was a remarkable ${
                  event.type || "event"
                } organized by ${
                  event.organizer || "our team"
                }, held from ${new Date(
                  event.startDate
                ).toLocaleDateString()} to ${new Date(
                  event.endDate
                ).toLocaleDateString()}. It featured engaging sessions, networking opportunities, and valuable insights. ${
                  event.cheifGuest
                    ? `The event was graced by ${event.cheifGuest}.`
                    : ""
                }`
              : "Description of the latest event."}
          </p>

          <button>
            <Link to="contactus">Contact Us</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
