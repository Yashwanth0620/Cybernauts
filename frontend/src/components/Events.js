import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Events.css";
import RegisterEvent from "./RegisterEvent";
import EventDetails from "./EventDetails";

import { useAuth } from "../AuthContext";

export default function Events() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [registerPage, setRegisterPage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState([]);
  const [filteredCompletedEvents, setFilteredCompletedEvents] = useState([]);
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_URI}:3001/events`);
        const { upcomingEvents, completedEvents } = response.data;

        setUpcomingEvents(upcomingEvents);
        setCompletedEvents(completedEvents);
        setFilteredCompletedEvents(completedEvents);
        setFilteredUpcomingEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on the search query

  const handleSearch = (e) => {
    const query = e.target.value; // Get the input value
    setSearchQuery(query); // Update the search query state

    // Filter the events based on the input value
    setFilteredCompletedEvents(
      completedEvents.filter((event) =>
        `${event.title} ${event.startDate} ${event.type}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
    setFilteredUpcomingEvents(
      upcomingEvents.filter((event) =>
        `${event.title} ${event.startDate} ${event.type}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  };

  const openAddEventForm = () => {
    // window.open("/admin/add-event", "_blank");
    navigate("/admin/add-event");
  };

  return (
    <div className="events">
      <div className="head">
        <div className="head-container">
          <div className="head-text">
            <h1>Events</h1>
            <h2>Explore all our past and upcoming events</h2>
          </div>
          {isAdmin && (
            <button className="head-btn" onClick={openAddEventForm}>
              Add Event
            </button>
          )}
        </div>
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
            onChange={handleSearch}
          />
        </form>
        <select defaultValue={searchQuery} onChange={handleSearch}>
          <option value="">All</option>
          <option value="hackathon">Hackathon</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="tech-talk">Tech Talk</option>
          <option value="Other">Other</option>
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
              <img
                src={event.poster}
                className="im"
                alt={<p>{event.title}</p>}
                referrerPolicy="no-referrer"
                style={{ width: "auto", height: "100%" }}
              />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate.substring(0, 10)}</h2>
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
              <img
                className="im"
                src={event.poster}
                referrerPolicy="no-referrer"
                alt={<p>{event.title}</p>}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate.substring(0, 10)}</h2>
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
      {registerPage && (
        <RegisterEvent event={selectedEvent} isAdmin={isAdmin} />
      )}
      {detailsPage && <EventDetails event={selectedEvent} isAdmin={isAdmin} />}
    </div>
  );
}
