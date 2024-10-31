import React from 'react';
import './styles/Events.css';

export default function Events() {
 
  const upcomingEvents = [
    {
      title: 'XYZ Hackers',
      date: '17th Oct 2024',
      type: 'Hackathon',
      imgSrc: 'https://cdn1.expresscomputer.in/wp-content/uploads/2019/07/25100405/Microsoft-Hackathon.jpg',
      alt: 'XYZ Hackers Event',
      buttonLabel: 'Register',
    },
    {
      title: 'Tech Seminar',
      date: '6th Nov 2024',
      type: 'Seminar',
      imgSrc: 'https://eduadvice.in/media/uploads/blog/seminar_images.jpg',
      alt: 'Tech Seminar Event',
      buttonLabel: 'Register',
    },
    {
      title: 'IOT Workshop',
      date: '24th Dec 2024',
      type: 'Workshop',
      imgSrc: 'https://www.techmarshals.com/wp-content/uploads/2017/07/workshops.jpg',
      alt: 'IOT Workshop Event',
      buttonLabel: 'Register',
    },
  ];

  const completedEvents = [
    {
      title: 'Gen AI Hackathon',
      date: '7th Oct 2024',
      type: 'Hackathon',
      imgSrc: 'https://cvr.ac.in/home4/images/hackathon2k18/2nd%20Prize.jpg',
      alt: 'Gen AI Hackathon Event',
      buttonLabel: 'View Details',
    },
    {
      title: 'DevOps Workshop',
      date: '10th Sep 2024',
      type: 'Workshop',
      imgSrc: 'https://www.techmarshals.com/wp-content/uploads/2017/07/workshops.jpg',
      alt: 'DevOps Workshop Event',
      buttonLabel: 'View Details',
    },
    {
      title: 'Virtual Reality in Learning',
      date: '30th Aug 2024',
      type: 'Seminar',
      imgSrc: 'https://tistcochin.edu.in/wp-content/uploads/2024/09/PIC2-CE-workshop24.png',
      alt: 'Virtual Reality Seminar Event',
      buttonLabel: 'View Details',
    },
  ];

  return (
    <div className='events'>

      <div className="head">
        <h1>Events</h1>
        <h2>Explore all our past and upcoming events</h2>
      </div>

      <div className="search-bar">
        <form action="/search" method="GET">
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search by name, date, description etc"
          />
        </form>
        <select>
          <option value="" disabled selected hidden>
            Filter
          </option>
          <option value="all">All</option>
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
        {upcomingEvents.map((event, index) => (
          <div className="card" key={index}>
            <img className="im" src={event.imgSrc} alt={event.alt} />
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.date}</h2>
                <h3>{event.type}</h3>
              </div>
              <button className="btn">{event.buttonLabel}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Events */}
      <div className="section-label">
        <span>Completed</span>
      </div>
      <div className="card-container">
        {completedEvents.map((event, index) => (
          <div className="card" key={index}>
            <img className="im" src={event.imgSrc} alt={event.alt} />
            <div className="card-body">
              <div className="item1">
                <h1>{event.title}</h1>
                <h2>{event.date}</h2>
                <h3>{event.type}</h3>
              </div>
              <button className="btn">{event.buttonLabel}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
