import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const ProtectedPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    const fetchProtectedData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/protected/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 401 && refreshToken) {
          // ✅ Try refreshing the access token
          try {
            const refreshResponse = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
              refresh: refreshToken,
            });

            localStorage.setItem("access_token", refreshResponse.data.access);

            // ✅ Retry fetching protected data with new access token
            const retryResponse = await axios.get(`${API_BASE_URL}/api/protected/`, {
              headers: { Authorization: `Bearer ${refreshResponse.data.access}` },
            });

            setMessage(retryResponse.data.message);
          } catch (refreshError) {
            alert("Session expired, please log in again.");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
          }
        } else {
          alert("Session expired, please log in again.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;