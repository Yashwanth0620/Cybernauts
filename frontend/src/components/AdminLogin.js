import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AdminLogin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json", // Required for FormData
          },
        }
      );

      if (response.status === 200) {
        // Assuming the response contains a token
        const { token } = response.data;
        console.log("ok")
        // Store token in localStorage
        localStorage.setItem("token", token);
        // toast.success("Admin Login Successful...!");
        // navigate("/"); // Navigate to the admin dashboard
        window.open("/", "_blank");
      } else {
        console.log("1")
        toast.error("Invalid Admin...!");
      }
    } catch (error) {
      console.log("2")
      toast.error("Invalid Admin...!");
    }
  };

  return (
    <>
    <div className="admin-login">
      <div className="login-form">
        <form onSubmit={loginAdmin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your Email"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
