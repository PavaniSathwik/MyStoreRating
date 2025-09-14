import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", address: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light p-3">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-3">Create an Account</h2>
        <p className="text-center text-muted mb-4">Join our community and start rating stores!</p>

        {message && <p className="text-center text-danger">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-dark w-100 rounded-pill mt-3">
            Register
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Already have an account? <a href="/login" className="fw-bold text-dark">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
