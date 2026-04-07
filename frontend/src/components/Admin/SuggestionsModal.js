import React from 'react';
import '../styles/EventDetails.css'; // Reusing EventDetails consistent styling

export default function SuggestionsModal({ closeSuggestions, feedbacks }) {
    return (
        <div className="modal" style={{ width: '500px', maxWidth: '90vw' }}>
            <div className="modal-content">
                <span className="close" onClick={closeSuggestions}>
                    &times;
                </span>
                <h2>Event Feedbacks</h2>
                <div className="feedback-list" style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                    {feedbacks && feedbacks.length > 0 ? (
                        feedbacks.map((feedback, index) => (
                            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                                <p style={{ margin: '0 0 5px 0' }}>
                                    <strong>Rating: </strong> {feedback.rating} / 5
                                </p>
                                <p style={{ margin: '0 0 5px 0' }}>
                                    <strong>Comment: </strong> {feedback.comment || "No comment provided."}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.9em', color: '#555' }}>
                                    <em>From: {feedback.email}</em>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No suggestions or feedbacks available for this event yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
