import React from "react";

export default function UserNavbar({ userName, search, setSearch, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ fontSize: "1.75rem", color: "#333" }}>
          StoreRate
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control rounded-pill"
            style={{ minWidth: "200px" }}
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="fw-bold">{userName}</span>
          <button className="btn btn-dark" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
