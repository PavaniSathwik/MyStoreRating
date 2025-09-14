import React, { useState, useEffect } from "react";
import axios from "axios";

// ------------------- Clickable Star Rating -------------------
function StarRating({ value, onRate }) {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              marginRight: "6px",
              userSelect: "none",
            }}
            onClick={() => onRate(starValue)}
          >
            <i
              className={`fa-star fa-solid ${
                starValue <= value ? "text-warning" : "text-muted"
              }`}
            />
            <span className="ms-1 text-muted small">{starValue}</span>
          </span>
        );
      })}
    </div>
  );
}

// ------------------- Store Card -------------------
function StoreCard({ store, onRate }) {
  const displayStars = store.userRating ?? Math.round(store.avgRating || 0);

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
          <p className="text-muted mb-1">
            Avg: {store.avgRating ? Number(store.avgRating).toFixed(1) : "—"}
          </p>
          <StarRating value={displayStars} onRate={(val) => onRate(store.id, val)} />
        </div>
      </div>
    </div>
  );
}

// ------------------- StoreList Component -------------------
export default function StoreList({ search = "" }) {
  const userId = localStorage.getItem("userId");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/stores");
        const normalized = (res.data || []).map((s) => ({ ...s, userRating: null }));
        setStores(normalized);
      } catch (err) {
        console.error("Error fetching stores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRate = async (storeId, value) => {
    if (!userId) {
      alert("Please login to rate stores.");
      return;
    }

    const prev = stores.find((s) => s.id === storeId)?.userRating ?? null;

    setStores((prevStores) =>
      prevStores.map((s) => (s.id === storeId ? { ...s, userRating: value } : s))
    );

    try {
      const res = await axios.post("http://localhost:5000/api/ratings", {
        storeId,
        userId: Number(userId),
        rating: Number(value),
      });

      const avgRating = res.data?.avgRating;
      setStores((prevStores) =>
        prevStores.map((s) =>
          s.id === storeId ? { ...s, avgRating: avgRating ?? s.avgRating } : s
        )
      );
    } catch (err) {
      console.error("Error submitting rating:", err);
      setStores((prevStores) =>
        prevStores.map((s) => (s.id === storeId ? { ...s, userRating: prev } : s))
      );
      alert("Could not save rating. Please try again.");
    }
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">Available Stores</h2>

      {loading ? (
        <p className="text-center text-muted">Loading stores...</p>
      ) : filteredStores.length === 0 ? (
        <p className="text-muted text-center">No stores found.</p>
      ) : (
        <div className="row">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} onRate={handleRate} />
          ))}
        </div>
      )}
    </div>
  );
}
