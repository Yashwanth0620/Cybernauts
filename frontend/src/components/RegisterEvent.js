import React from "react";
import "./styles/RegisterEvent.css";

export default function RegisterEvent({ event, isAdmin }) {
  return (
    <div>
      {/* <div className="overlay"></div> */}

      {/* Register page */}
      <div className="register-page">
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

        <div className="register-button">
          {!isAdmin ? <button>Register</button> : <button>Edit Event</button>}
        </div>
      </div>
    </div>
  );
}
