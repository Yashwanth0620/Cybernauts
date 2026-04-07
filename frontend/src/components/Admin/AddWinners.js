import React, { useState } from "react";
import "../styles/winners.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddWinners() {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {}; // Get event from state

    const [option, setOption] = useState("Team");
    const [teamSize, setTeamSize] = useState();
    const [position, setPosition] = useState("");
    const [prizeMoney, setPrizeMoney] = useState("");
    const [teamMembers, setTeamMembers] = useState([{ name: "", collegename: "" }]);

    if (!event) {
        // Handle case where accessed directly without event state
        return <div className="winners-container"><h3>Error: Event not found. Please navigate from Event Details.</h3></div>
    }

    const handleOptionChange = (e) => {
        setOption(e.target.value);
        setTeamMembers([{ name: "", collegename: "" }]);
        setTeamSize(""); // Reset team size
    };

    const handleTeamSizeChange = (e) => {
        const size = parseInt(e.target.value, 10);
        setTeamSize(size);
        setTeamMembers(Array.from({ length: size }, () => ({ name: "", collegename: "" })));
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const winnerData = {
            position,
            prizeMoney,
            type: option,
            teamSize: option === "Team" ? teamSize : 1,
            members: teamMembers,
        };

        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/admin/events/${event._id}/winners`,
                winnerData,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            toast.success("Winner Added Successfully", {
                onClose: () => navigate(-1) // Go back to event details after toast closes
            });
        } catch (error) {
            console.error("Error adding winner:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to add winner";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="winners-container">
            <h2>Add Winner for {event.title}</h2>
            <input
                type="text"
                id="position"
                placeholder="Position:"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <input
                type="text"
                id="prizeMoney"
                placeholder="Prize Money:"
                value={prizeMoney}
                onChange={(e) => setPrizeMoney(e.target.value)}
            />
            <select onChange={handleOptionChange} value={option}>
                <option value="Team">Team</option>
                <option value="Individual">Individual</option>
            </select>

            {option === "Team" && (
                <>
                    <input
                        type="number"
                        value={teamSize}
                        onChange={handleTeamSizeChange}
                        placeholder="Team Size:"
                    />
                    {teamMembers.map((member, index) => (
                        <div className="member-input" key={index}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="College Name"
                                value={member.collegename}
                                onChange={(e) => handleMemberChange(index, "collegename", e.target.value)}
                            />
                        </div>
                    ))}
                </>
            )}
            {option === "Individual" && (
                <div className="member-input">
                    <input
                        type="text"
                        placeholder="Name"
                        value={teamMembers[0]?.name || ""}
                        onChange={(e) => handleMemberChange(0, "name", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="College Name"
                        value={teamMembers[0]?.collegename || ""}
                        onChange={(e) => handleMemberChange(0, "collegename", e.target.value)}
                    />
                </div>
            )}
            <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
            <ToastContainer />
        </div>
    );
}
