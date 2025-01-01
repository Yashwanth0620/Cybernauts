import React from "react";
// This file has the same CSS as RegisterEvent, (same class definitions)
import banner from "../assets/banner.jpeg";
import { Carousel } from "react-responsive-carousel";
import "./styles/EventDetails.css";

export default function EventDetails({ event, isAdmin }) {
  return (
    <div>
      {/* <div className="overlay"></div> */}

      {/* Events Details Page */}
      <div className="event-details-page">
        <h1 className="event-name">{event.title}</h1>
        <p className="date">{event.startDate}</p>
        <br />
        <p className="people">
          <b>Mentored By: &nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.mentor || "--"} <br />
          <b>Inaugurated By: &nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.inaugurator || "--"} <br />
          <b>Chief guest(s): &nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.chiefGuests
            ? event.chiefGuests.array.map((element) => element.name).join(", ")
            : "--"}
        </p>

        <p className="description">&nbsp;&nbsp;&nbsp;{event.desc}</p>
        <p className="participants">
          Participants count:{" "}
          {event.participants ? event.participants.length : 0}
        </p>

        {/* Image Carousel */}
        <div className="image-carousel">
          {/* <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            dynamicHeight
          >
            {event.images && event.images.length > 0 ? (
              event.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Event image ${index + 1}`} />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
            <div><img src={banner} alt="" /></div>
            <div><img src={banner} alt="" /></div>
            <div><img src={banner} alt="" /></div>
          </Carousel> */}
        </div>

        {isAdmin && (
          <div className="btn-wrap">
            <button className="admin-btn edit">Edit Event</button>
            <button className="admin-btn delete">Delete Event</button>
          </div>
        )}
      </div>
    </div>
  );
}
