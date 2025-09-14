import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/" style={{ fontSize: "1.75rem", color: "#333" }}>
          StoreRate
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item me-lg-3">
              <a className="nav-link fs-5 fw-bold text-dark" href="/">
                Home
              </a>
            </li>
            
            <li className="nav-item">
              <a className="btn btn-outline-dark rounded-pill px-4 fs-5 me-2" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-dark rounded-pill px-4 fs-5" href="/register">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;