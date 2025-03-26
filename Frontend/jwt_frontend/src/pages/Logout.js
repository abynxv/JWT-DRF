import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to home
  }, [navigate]);

  return (
    <div className="container">
      <div className="box">
        <h2>You have been logged out.</h2>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}

export default Logout;
