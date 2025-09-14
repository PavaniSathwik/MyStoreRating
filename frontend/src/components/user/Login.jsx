import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/AdminDashboard");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const user = res.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);

      if (user.role === "store_owner") navigate("/owner-dashboard");
      else if (user.role === "normal") navigate("/user-dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center bg-light"
      style={{
        marginTop: "60px", // space from navbar
        marginBottom: "40px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <h2
          className="card-title text-center mb-4"
          style={{ fontWeight: "600", fontSize: "1.5rem", color: "#333" }}
        >
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              className="form-control border-start-0"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontSize: "0.9rem", padding: "10px" }}
            />
          </div>

          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className="form-control border-start-0"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: "0.9rem", padding: "10px" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            style={{ fontWeight: "500", fontSize: "1rem" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
