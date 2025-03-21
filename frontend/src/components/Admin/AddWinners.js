import React, { useState } from "react";
import "../styles/winners.css";

export default function AddWinners() {
    const [option, setOption] = useState("Team");
    const [teamSize, setTeamSize] = useState();
    const [teamMembers, setTeamMembers] = useState([{ name: "", collegename: "" }]);

    const handleOptionChange = (e) => {
        setOption(e.target.value);
        setTeamMembers([{ name: "", collegename: "" }]);
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

    return (
        <div className="winners-container">
            <input type="text" id="position" placeholder="Position:" />
            <input type="text" id="prizeMoney" placeholder="Prize Money:" />
            <select onChange={handleOptionChange}>
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
                        onChange={(e) => handleMemberChange(0, "name", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="College Name"
                        onChange={(e) => handleMemberChange(0, "collegename", e.target.value)}
                    />
                </div>
            )}
            <button type="submit" className="submit-btn">Submit</button>
        </div>
    );
}