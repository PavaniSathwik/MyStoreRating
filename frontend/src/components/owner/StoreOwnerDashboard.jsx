import React, { useState, useEffect } from "react";
import axios from "axios";

// ------------------- Navbar -------------------
function OwnerNavbar({ ownerName }) {
  const handleLogout = () => {
    localStorage.clear(); // Clear all user info
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm">
      <div className="container-fluid">
        <span
          className="navbar-brand fw-bold"
          style={{ fontSize: "1.75rem", color: "#333" }}
        >
          StoreRate
        </span>
        <div className="ms-auto d-flex align-items-center">
          {ownerName && <span className="me-3 fw-bold">Hello, {ownerName}</span>}
          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

// ------------------- Star Rating -------------------
function StarRating({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  return (
    <div>
      {stars.map((filled, i) => (
        <i
          key={i}
          className={`fa-star fa-solid me-1 ${filled ? "text-warning" : "text-muted"}`}
        ></i>
      ))}
    </div>
  );
}

// ------------------- Store Card -------------------
function StoreCard({ store }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100 shadow-lg border-0" style={{ borderRadius: "20px" }}>
        <img
          src={store.photo || "/placeholder.jpg"}
          className="card-img-top"
          alt={store.name}
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{store.name}</h5>
          <p className="text-muted">{store.address}</p>
          <p className="text-muted">Users Rated: {store.usersRated}</p>
          <StarRating rating={store.avgRating} />
        </div>
      </div>
    </div>
  );
}

// ------------------- Dashboard -------------------
export default function StoreOwnerDashboard() {
  const ownerName = localStorage.getItem("ownerName");
  const ownerId = localStorage.getItem("userId");

  const [showForm, setShowForm] = useState(false);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStore, setNewStore] = useState({ name: "", address: "", photo: "" });

  // Fetch owner stores
  const fetchStores = async () => {
    if (!ownerId) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/stores/owner/${ownerId}`);
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [ownerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newStore, ownerId };
      await axios.post("http://localhost:5000/api/stores", payload);
      fetchStores();
      setNewStore({ name: "", address: "", photo: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating store:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error creating store");
    }
  };

  return (
    <>
      <OwnerNavbar ownerName={ownerName} />

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Your Stores</h2>
          <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Create Your Own Store"}
          </button>
        </div>

        {showForm && (
          <div className="card p-4 mb-5 shadow-lg" style={{ borderRadius: "20px" }}>
            <h4 className="fw-bold mb-3">Add New Store</h4>
            <form onSubmit={handleCreateStore}>
              <div className="mb-3">
                <label className="form-label">Store Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newStore.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={newStore.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Photo URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="photo"
                  value={newStore.photo}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Add Store
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading stores...</p>
        ) : stores.length === 0 ? (
          <p className="text-muted">You haven’t created any stores yet.</p>
        ) : (
          <div className="row">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
