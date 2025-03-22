import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Events.css";
import { useAuth } from "../AuthContext";

export default function Events() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState([]);
  const [filteredCompletedEvents, setFilteredCompletedEvents] = useState([]);
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/events`);
        const { upcomingEvents, completedEvents } = response.data;

        setUpcomingEvents(upcomingEvents);
        setCompletedEvents(completedEvents);
        setFilteredUpcomingEvents(upcomingEvents);
        setFilteredCompletedEvents(completedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again later.");
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredUpcomingEvents(
      upcomingEvents.filter((event) =>
        `${event.title} ${event.startDate} ${event.type}`
          .toLowerCase()
          .includes(query)
      )
    );

    setFilteredCompletedEvents(
      completedEvents.filter((event) =>
        `${event.title} ${event.startDate} ${event.type}`
          .toLowerCase()
          .includes(query)
      )
    );
  };

  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setFilteredUpcomingEvents(upcomingEvents);
      setFilteredCompletedEvents(completedEvents);
    } else {
      setFilteredUpcomingEvents(
        upcomingEvents.filter((event) => event.type.toLowerCase() === query)
      );
      setFilteredCompletedEvents(
        completedEvents.filter((event) => event.type.toLowerCase() === query)
      );
    }
  };

  const openAddEventForm = () => {
    navigate("/admin/add-event");
  };

  const handleViewDetails = (event) => {
    const eventDate = new Date(event.startDate);
    const currentDate = new Date();
    const path = eventDate > currentDate ? "/events/upcoming" : "/events/completed";
    navigate(path, { state: { event } });
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
            placeholder="Search by name, date, type, etc."
            value={searchQuery}
            onChange={handleSearch}
          />
        </form>

        <select defaultValue="" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="hackathon">Hackathon</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="tech-talk">Tech Talk</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="section-label"><span>Upcoming</span></div>
      <div className="card-container">
        {filteredUpcomingEvents.map((event, index) => (
          <div className="card" key={index}>
            <div className="im-parent">
              <img
                src={event.poster}
                referrerPolicy="no-referrer"
                className="im"
                alt={event.title}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate.substring(0, 10)}</h2>
                <h3>{event.type}</h3>
              </div>
              <button className="btn" onClick={() => handleViewDetails(event)}>
                {!isAdmin ? "Register" : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="section-label"><span>Completed</span></div>
      <div className="card-container">
        {filteredCompletedEvents.map((event, index) => (
          <div className="card" key={index}>
            <div className="im-parent">
              <img
                className="im"
                src={event.poster}
                alt={event.title}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.startDate.substring(0, 10)}</h2>
                <h3>{event.type}</h3>
              </div>
              <button className="btn" onClick={() => handleViewDetails(event)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
