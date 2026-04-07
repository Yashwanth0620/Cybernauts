import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view contacts");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URI}/admin/contacts`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch contacts";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact submission?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URI}/admin/contacts/${contactId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Contact deleted successfully");
      // Remove the deleted contact from the list
      setContacts(contacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete contact";
      toast.error(errorMessage);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(query) ||
      contact.desc?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading contacts...</h2>
      </div>
    );
  }

  return (
    <div className="admin-contact-container" style={{ padding: "2rem" }}>
      <ToastContainer />
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Contact Submissions</h1>
        <p style={{ color: "#666" }}>View all contact form submissions from users</p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      {filteredContacts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
          <p>No contact submissions found.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {filteredContacts.map((contact, index) => (
            <div
              key={contact._id || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: "1.25rem",
                      color: "#333",
                    }}
                  >
                    {contact.name || "Anonymous"}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#666",
                    }}
                  >
                    Submitted: {formatDate(contact.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(contact._id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                >
                  Delete
                </button>
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  marginTop: "1rem",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    lineHeight: "1.6",
                    color: "#333",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {contact.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

