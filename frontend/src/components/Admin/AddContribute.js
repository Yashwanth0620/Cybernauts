import React, { useState } from 'react';
import "../styles/AddContribute.css";

export default function AddContribute({ closeModal }) {
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [image, setImage] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const eventList = [
    'Annual Meet',
    'TechFest',
    'Cultural Fest',
    'Hackathon',
    'Workshop',
    'Seminar',
    'Sports Day',
    'Project Expo'
  ];

  const handleSearch = (input) => {
    setEventName(input);
    if (input === '') {
      setFilteredEvents([]);
      return;
    }
    const results = eventList.filter(event => 
      event.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredEvents(results.slice(0, 5)); // Display max 5 results
  };

  const selectEvent = (name) => {
    setEventName(name);
    setFilteredEvents([]); // Hide dropdown on selection
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!description || !eventName || !image) {
      alert("All fields are required.");
      return;
    }
    console.log({ description, eventName, image });
    closeModal(); // Close modal after submitting
  };

  return (
    <div className='AddContribute'>
    <div className='AddContribute-overlay' onClick={closeModal}>
      <div className='AddContributeModel' onClick={(e) => e.stopPropagation()}>
        {/* <button className='CloseButton' onClick={closeModal}>✖</button> */}
        <h2>Add Contribution</h2>

        <div className='AddItem'>
          <label>Description :</label>
          <input 
            type="text" 
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='AddItem'>
          <label>Event Name :</label>
          <input 
            type="text" 
            placeholder='Enter Event Name'
            value={eventName}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredEvents.length > 0 && (
            <ul className='dropdown'>
              {filteredEvents.map((event, index) => (
                <li key={index} onClick={() => selectEvent(event)}>
                  {event}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='AddItem'>
          <label>Upload Image :</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="ButtonContainer">
          <button className="CancelButton" onClick={closeModal}>Cancel</button>
          <button className="SubmitButton" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </div>
  );
}
