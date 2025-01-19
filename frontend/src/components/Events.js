import React, { useState } from "react";
import "./styles/Events.css";
import RegisterEvent from "./RegisterEvent";
import EventDetails from "./EventDetails";

export default function Events() {
  const [registerPage, setRegisterPage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isAdmin = !!localStorage.getItem("token");

  const upcomingEvents = [
    {
      _id: 1,
      title: "XYZ Hackers",
      startDate: "17th Oct 2024",
      type: "Hackathon",
      imgSrc:
        "https://cdn1.expresscomputer.in/wp-content/uploads/2019/07/25100405/Microsoft-Hackathon.jpg",
      alt: "XYZ Hackers Event",
    },
    {
      _id: 2,
      title: "Tech Seminar",
      startDate: "6th Nov 2024",
      type: "Seminar",
      imgSrc: "https://eduadvice.in/media/uploads/blog/seminar_images.jpg",
      alt: "Tech Seminar Event",
    },
    {
      _id: 3,
      title: "IOT Workshop",
      startDate: "24th Dec 2024",
      type: "Workshop",
      imgSrc:
        "https://www.techmarshals.com/wp-content/uploads/2017/07/workshops.jpg",
      alt: "IOT Workshop Event",
    },
  ];

  const completedEvents = [
    {
      _id: 4,
      title: "Gen AI Hackathon",
      startDate: "7th Oct 2024",
      type: "Hackathon",
      imgSrc: "https://cvr.ac.in/home4/images/hackathon2k18/2nd%20Prize.jpg",
      alt: "Gen AI Hackathon Event",
    },
    {
      _id: 5,
      title: "DevOps Workshop",
      startDate: "10th Sep 2024",
      type: "Workshop",
      imgSrc:
        "https://www.techmarshals.com/wp-content/uploads/2017/07/workshops.jpg",
      alt: "DevOps Workshop Event",
    },
    {
      _id: 6,
      title: "Virtual Reality in Learning",
      startDate: "30th Aug 2024",
      type: "Seminar",
      imgSrc:
        "https://tistcochin.edu.in/wp-content/uploads/2024/09/PIC2-CE-workshop24.png",
      alt: "Virtual Reality Seminar Event",
    },
  ];

  // Filter events based on the search query
  const filteredUpcomingEvents = upcomingEvents.filter((event) =>
    `${event.title} ${event.startDate} ${event.type}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredCompletedEvents = completedEvents.filter((event) =>
    `${event.title} ${event.startDate} ${event.type}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="events">
      <div className="head">
        <h1>Events</h1>
        <h2>Explore all our past and upcoming events</h2>
      </div>

      <div className="search-bar">
        <form onSubmit={(e) => e.preventDefault()}>
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search by name, date, type etc"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <select
          onChange={(e)=> setSearchQuery(e.target.value)}
          >
          <option value="">All</option>
          <option value="hackathon">Hackathon</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="tech-talk">Tech Talk</option>
        </select>
        <i className="fas fa-chevron-down" type="filter"></i>
      </div>

      {/* Upcoming Events */}
      <div className="section-label">
        <span>Upcoming</span>
      </div>
      <div className="card-container">
        {filteredUpcomingEvents.map((event, index) => (
          <div className="card" key={index}>
            <div className="im-parent">
              <img className="im" src={event.imgSrc} alt={event.alt} />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate}</h2>
                <h3>{event.type}</h3>
              </div>
              <button
                className="btn"
                onClick={() => {
                  setSelectedEvent(event);
                  setRegisterPage(true);
                }}
              >
                {!isAdmin ? "Register" : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Events */}
      <div className="section-label">
        <span>Completed</span>
      </div>
      <div className="card-container">
        {filteredCompletedEvents.map((event, index) => (
          <div className="card" key={index}>
            <div className="im-parent">
              <img className="im" src={event.imgSrc} alt={event.alt} />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate}</h2>
                <h3>{event.type}</h3>
              </div>
              <button
                className="btn"
                onClick={() => {
                  setSelectedEvent(event);
                  setDetailsPage(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay controlling */}
      {(registerPage || detailsPage) && (
        <div
          className="overlay"
          onClick={() => {
            setDetailsPage(false);
            setRegisterPage(false);
          }}
        ></div>
      )}

      {/* Displaying details for an event */}
      {registerPage && <RegisterEvent event={selectedEvent} isAdmin={isAdmin} />}
      {detailsPage && <EventDetails event={selectedEvent} isAdmin={isAdmin} />}
    </div>
  );
}
