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
  const [file, setFile] = useState(null);

  const handleBranchClick = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBranches.length === 0) {
      toast.error("Please select at least one branch.");
      return;
    }

    if (!file) {
      toast.error("Please upload an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("notice", message);
    formData.append("branches", JSON.stringify(selectedBranches));
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/announce`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setMessage("");
        setSelectedBranches([]);
        setFile(null);
        // Reset file input element if needed, though react state is usually sufficient
        const fileInput = document.getElementById("excel-upload");
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to announce...");
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
                className={`branch-item ${selectedBranches.includes(branch.name) ? "selected" : ""
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

          {/* File Upload */}
          <div className="file-upload-container" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px", marginTop: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "250px" }}>
              <label htmlFor="excel-upload" style={{ fontSize: "0.9rem", marginBottom: "5px", fontWeight: "bold", color: "#ffffff", textShadow: "0px 0px 5px rgba(255, 255, 255, 0.3)" }}>
                Upload Data Excel:
              </label>
              <input
                type="file"
                id="excel-upload"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ color: "#e0e0e0", padding: "5px", fontSize: "0.8rem", width: "100%", borderRadius: "6px", background: "#333", border: "1px solid #444", boxSizing: "border-box", cursor: "pointer" }}
              />
            </div>
          </div>
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
