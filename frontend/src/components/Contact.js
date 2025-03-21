import React, { useState } from 'react';
import './styles/Contact.css';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({name: "", desc: ""});

  const handleSubmit = async () => {
    const response = await axios.post(`http://${process.env.REACT_APP_BACKEND_URI}:3001/contact`, form);

  }

  
  return (
    <>

      <section className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Reach out for any questions, feedback, and collaborations</p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your Email" required />

            <label htmlFor="desc">Description:</label>
            <textarea id="desc" name="desc" rows="4" placeholder="Your Feedback..." required></textarea>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
