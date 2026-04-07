import React, { useState } from "react";
import ReactDom from "react-dom";
import "./styles/RegisterModal.css";
import { toast } from "react-toastify";

export default function RegisterModal({ isOpen, onClose, eventId, eventTitle, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        rollNo: "",
        branch: "",
        year: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/events/${eventId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success("Registered successfully!");
                onClose();
                if (onSuccess && data.participant) {
                    onSuccess(data.participant);
                }
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error registering for event:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Register for {eventTitle}</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Roll Number</label>
                        <input
                            type="text"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Branch</label>
                        <input
                            type="text"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>,
        document.getElementById("portal")
    );
}
