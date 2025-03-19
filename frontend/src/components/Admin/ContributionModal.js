import React, { useState } from 'react';
import "../styles/ContributionModal.css";

export default function ContributionModal( {closecontribute} ) {
  const [description, setDescription] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [image, setImage] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const members = ['22B81A05U1', '22B81A05U2', '22B81A05U3', '22B81A05U4', '22B81A05U5', '22B81A05U6', '22B81A05U7'];

  const handleSearch = (value) => {
    setRollNo(value);
    if (value === '') {
      setFilteredMembers([]);
    } else {
      const results = members.filter(member => member.includes(value)).slice(0, 5);
      setFilteredMembers(results);
    }
  };

  return (
    <div className='contributcontainer'>
      <div className='contributionmodal-overlay'>
        <div className='AddContributeModel'>
          <h2>Member Contribution Form:</h2>

          <div className='AddItem'>
            <label>Roll No:</label>
            <input 
              type="text" 
              placeholder='Enter Roll No' 
              value={rollNo}
              onChange={(e) => handleSearch(e.target.value)}
            />
             {filteredMembers.length > 0 && (
              <ul className='dropdown'>
                {filteredMembers.map((member, index) => (
                  <li 
                    key={index} 
                    onClick={() => {
                      setRollNo(member);
                      setFilteredMembers([]); // Close the dropdown on select
                    }}
                  >
                    {member}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='AddItem-description'>
            <label>Description:</label>
            <textarea 
              placeholder='Enter Description.....' 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='rows-4' // Example for using rows-4 class
            />
          </div>

          <div className='AddItem'>
            <label>Upload Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="ButtonContainer">
            <button className="CancelButton" onClick={closecontribute}>Cancel</button>
            <button className="SubmitButton">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
