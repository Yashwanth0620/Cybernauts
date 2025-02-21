import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./styles/AdminLogin.css"
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();
  
    // Create FormData object to hold email and password
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
  
    try {
      const response = await axios.post("http://localhost:3001/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      });
  
      if (response.status === 200) {
        // Assuming the response contains a token
        const { token } = response.data;
  
        // Store token in localStorage
        localStorage.setItem("token", token);
        navigate("/"); // Navigate to the admin dashboard
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  
  return (
    <div className='admin-login'>
      <div className="login-form">
          <form onSubmit={loginAdmin}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter your Email" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'/>

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
    </div>
  )
}
