import { Link } from "react-router-dom";

function LandingPage() {
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  return (
    <div className="container">
      <h1>Welcome to JWT Auth</h1>
      <div className="box">
        {!isAuthenticated ? (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
            <Link to="/forgot-password"><button>Forgot Password</button></Link>
          </>
        ) : (
          <Link to="/logout"><button>Logout</button></Link>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
