import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedPage from "./pages/ProtectedPage";  // ✅ Import Protected Page
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import Protected Route

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<ProtectedPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
