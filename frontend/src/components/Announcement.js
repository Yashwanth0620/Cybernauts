import { useState } from "react";
import "./styles/announcement.css";

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
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="announcement-container">
      <h2 className="announcement-title">Select Branches</h2>
      <form onSubmit={handleSubmit}>
        <div className="branch-grid">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className={`branch-item ${selectedBranches.includes(branch.name) ? "selected" : ""}`}
              onClick={() => handleBranchClick(branch.name)}
            >
              <img src={branch.logo} alt={branch.name} className="branch-logo" />
              <div className="overlay">{selectedBranches.includes(branch.name) && "✔"}</div>
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
  );
}
