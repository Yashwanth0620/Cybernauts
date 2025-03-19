import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AdminLogin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  // const {role} = useAuth();

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
        const { token, name, phone, email } = response.data;

        // Store token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        toast.success("🦄Login Successful...!", {
          autoClose: 500,
          onClose: () => {
            window.open("/", "_self");
          }
        });
      } else {
        toast.error("Invalid Credentials...!");
      }
    } catch (error) {
      toast.error("Internal Error...!");
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
