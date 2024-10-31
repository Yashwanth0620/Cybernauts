import React from 'react';
import './styles/Contact.css';

export default function Contact() {
  return (
    <>

      <section className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Reach out for any questions, feedback, and collaborations</p>
        </div>
        <div className="contact-form">
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your Email" required />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4" placeholder="Your Feedback..." required></textarea>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
