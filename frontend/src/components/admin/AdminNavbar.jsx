import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login"); // redirect after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow">
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3" to="/admin/AdminDashboard">
          Admin Dashboard
        </Link>

        {/* Right-side menu */}
        <div className="ms-auto d-flex align-items-center">
          <Link className="nav-link text-light fs-5 me-4" to="/admin/AdminDashboard">
            Dashboard
          </Link>
          <button
            className="btn btn-outline-light btn-lg px-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
