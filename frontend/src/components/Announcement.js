import { useState } from "react";
import "./styles/announcement.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const branches = [
  { name: "CSE", logo: "cse.jpeg" },
  { name: "IT", logo: "cse.jpeg" },
  { name: "CSIT", logo: "cse.jpeg" },
  { name: "CSE AIML", logo: "cse.jpeg" },
  { name: "CSBS", logo: "cse.jpeg" },
  { name: "CSM", logo: "cse.jpeg" },
  { name: "AIML", logo: "cse.jpeg" },
  { name: "DS", logo: "cse.jpeg" },
];

export default function Announcement() {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [message, setMessage] = useState("");

  const handleBranchClick = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mails = [];
    if (selectedBranches.includes("CSE"))
      mails.push("yashwanth.k0620@gmail.com");
    if (selectedBranches.includes("IT")) mails.push("22b81a05y0.2@gmail.com");
    const data = { mails, notice: message };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/announce`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("Announcement send successfully...");
      }
    } catch (error) {
      toast.error("Failed to announce...");
    }
  };

  return (
    <>
      <div className="announcement-container">
        <h2 className="announcement-title">Select Branches</h2>
        <form onSubmit={handleSubmit}>
          <div className="branch-grid">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className={`branch-item ${
                  selectedBranches.includes(branch.name) ? "selected" : ""
                }`}
                onClick={() => handleBranchClick(branch.name)}
              >
                <img
                  src={branch.logo}
                  alt={branch.name}
                  className="branch-logo"
                />
                <div className="overlay">
                  {selectedBranches.includes(branch.name) && "✔"}
                </div>
                <span className="branch-name">{branch.name}</span>
              </div>
            ))}
          </div>
          {/* Message Box */}
          <textarea
            className="message-box"
            rows={4}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
