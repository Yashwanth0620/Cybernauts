import React from "react";
import "./styles/Home.css"; 
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="home">
      {/* Top Header */}
      <header className="top-header">
        <span>📞 +91 77777 88888 | +91 88888 99999</span>
        <a href="https://cvr.ac.in/home4/" target="_blank" className="link" rel="noreferrer">
          CVR College of Engineering
        </a>
        <Link to="/admin/login" className="link admin-link">Admin?</Link>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="logo">
          <img src={require('../assets/logo.png')} alt="Cybernauts logo"></img>
        </div>
        <div>
          <h1>CYBERNAUTS</h1>
          <p>Hackers Club</p>
          <h5>01 Dec 2024</h5>
          <h4>
            <i>"Innovating the future of Technology"</i>
          </h4>
          <button>View Event Highlights</button>
        </div>
      </section>

      <NavBar largeWidth={ window.innerWidth > 670}/>

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
        <button>View our Members</button>
      </section>

      {/* Recent Event Section */}
      <section className="recent-event">
        <h2>What we Do?</h2>
        <h3>Our recent event</h3>
        <div className="event-content">
          <img
            src="https://news.microsoft.com/wp-content/uploads/prod/sites/45/2019/07/Teamshacking@Microsoft2019hackathon_-960x630.jpg"
            alt="Recent Hackathon Event"
          />
          <h4>
            <strong>Hacker's Club (Name of recent event)</strong>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum esse accusantium ad velit mollitia illo repellendus, ipsam in deleniti. Possimus architecto reprehenderit dolor ea, soluta quibusdam est impedit vero similique?
            Reiciendis incidunt praesentium accusantium, modi sapiente quis natus minus facere, dolores optio veniam commodi fugit perferendis, dicta nesciunt earum ab. Iste saepe molestias laudantium voluptate voluptates eum recusandae pariatur veritatis.
          </p>
          <button>Join Us</button>
        </div>
      </section>
    </div>
  );
};

export default App;
