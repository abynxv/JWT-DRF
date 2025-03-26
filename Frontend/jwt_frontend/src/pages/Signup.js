import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css"; // Import common styling

const API_BASE_URL = "http://localhost:8000"; // Adjust if needed

const Signup = () => {
  const [username, setUsername] = useState(""); // ✅ Change "fullName" to "username"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/signup/`, {
        username, // ✅ Correct key
        email,
        password,
      });

      // ✅ Store JWT tokens in localStorage
      localStorage.setItem("access_token", response.data.user.tokens.access);
      localStorage.setItem("refresh_token", response.data.user.tokens.refresh);

      alert("Signup Successful! Redirecting to dashboard...");
      navigate("/dashboard"); // ✅ Adjust route as needed
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username" // ✅ Changed from "Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;