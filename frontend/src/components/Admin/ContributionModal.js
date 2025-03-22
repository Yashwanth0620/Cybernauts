import React, { useState, useEffect } from "react";
import "../styles/ContributionModal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ContributionModal({
  closecontribute,
   eventId,
   eventName
}) {
  const [description, setDescription] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [year, setYear] = useState([]);

 useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/members`);
        setMembers(response.data.members);
        setYear(response.data.year);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = (value) => {
    setRollNo(value);
    if (value === "") {
      setFilteredMembers([]);
    } else {
      const results = members
        .filter((member) =>
          member.rollNo.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setFilteredMembers(results);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollNo || !description) {
      toast.warn("Fill All Details..!");
      return;
    }
    const result = members.find((member) =>
      member.rollNo.toLowerCase().includes(rollNo.toLowerCase())
    );
    if (!result || result.length === 0) {
      toast.warn("Select RollNo from list..!");
      return;
    }
    const id1 = result._id;
    const form1 = new FormData();
    form1.append("rollNo", rollNo);
    form1.append("description",description);
    form1.append("id", id1);
    form1.append("year", year);
    form1.append("eventId", eventId);
    form1.append("eventName", eventName);
    if (image) {
      form1.append("image", image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URI}/admin/members/eventcontribution/${year}/${id1}`,
        form1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
        toast.success("Contribution Added successfully",{
          autoClose : 1000
        });

      setDescription("")
      setRollNo("")
      setImage(null)
      setTimeout(() => {
        closecontribute();
      }, 2000);
      // closecontribute()
    } catch (error) {
      toast.error("Failed to Add Contribution..!");
    }

  };

  return (
    <>
      <div className="contributcontainer">
        <div
          className="contributionmodal-overlay"
          onMouseDown={(e) =>
            e.target.classList.contains("contributionmodal-overlay") &&
            closecontribute()
          }
        >
          <div className="AddContributeModel">
            <h2>Member Contribution Form:</h2>

            <div className="AddItem">
              <label>Roll No:</label>
              <input
                type="text"
                placeholder="Enter Roll No"
                value={rollNo}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {console.log(members)}
              {console.log(filteredMembers)}
              {filteredMembers.length > 0 && (
                <ul className="dropdown">
                  {filteredMembers.map((member, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setRollNo(member.rollNo);
                        setFilteredMembers([]); // Close the dropdown on select
                      }}
                    >
                      {member.rollNo}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="AddItem-description">
              <label>Description:</label>
              <textarea
                placeholder="Enter Description....."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rows-4"
              />
            </div>

            <div className="AddItem">
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="ButtonContainer">
              <button className="CancelButton" onClick={()=>{
                setDescription("")
                setRollNo("")
                setImage(null)
                closecontribute()
                }}>
                Cancel
              </button>
              <button className="SubmitButton" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
