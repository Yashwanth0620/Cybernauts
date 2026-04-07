import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/FeedbackForm.css"; // We'll need to create this CSS file

export default function FeedbackForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        rating: 5,
        comment: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventTitle, setEventTitle] = useState("");

    // Optional: Fetch event details to show title? 
    // For now, we can just show "Event Feedback" or fetch if we want to be fancy.
    // Let's keep it simple first.

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URI}/feedback/${id}/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success("Thank you for your feedback!");
                setTimeout(() => {
                    navigate("/"); // Redirect to home after success
                }, 2000);
            } else {
                toast.error(data.message || "Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="feedback-container">
            <div className="feedback-card">
                <h2>Event Feedback</h2>
                <p>We value your opinion! Please rate your experience.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email (used for registration)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your registered email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Rating</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${formData.rating >= star ? "filled" : ""}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Comments (Optional)</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="What did you like? What can we improve?"
                            rows="4"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
