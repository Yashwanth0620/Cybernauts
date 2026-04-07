import React, { useState } from 'react';
import './styles/Contact.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [form, setForm] = useState({name: "", desc: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/contact`, form);
      if (response.status === 201) {
        toast.success('Thank you for your feedback! We will get back to you soon.');
        setForm({name: "", desc: ""});
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(error.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  
  return (
    <>
      <ToastContainer />
      <section className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Reach out for any questions, feedback, and collaborations</p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your Name" 
              value={form.name}
              onChange={handleChange}
              required 
            />

            <label htmlFor="desc">Description:</label>
            <textarea 
              id="desc" 
              name="desc" 
              rows="4" 
              placeholder="Your Feedback..." 
              value={form.desc}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
