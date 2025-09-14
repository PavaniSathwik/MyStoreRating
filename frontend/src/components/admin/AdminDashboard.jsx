import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
const [totalStores, setTotalStores] = useState(0);
const [totalRatings, setTotalRatings] = useState(0);
  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);









  //-----------------------------






  const fetchSummary = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/admin/summary");
    setTotalStores(res.data.totalStores);
    setTotalRatings(res.data.totalRatings);
  } catch (err) {
    console.error("Error fetching summary:", err);
  }
};

useEffect(() => {
  fetchUsers(); // existing
  fetchSummary(); // new
}, []);
  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  // Update user role
  const handleUpdateRole = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/users/${selectedUser.id}`, {
        role: newRole,
        name: selectedUser.name,
        email: selectedUser.email,
        address: selectedUser.address
      });
      setUsers(users.map(u => (u.id === selectedUser.id ? res.data.user : u)));
      setSelectedUser(null);
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Close modal
  const handleCancel = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container my-5">
      {/* Dashboard Summary */}
      <h2 className="text-center fw-bold mb-4">Overview</h2>
      <div className="row justify-content-center g-4 mb-5">
        {/* Total Stores */}
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-lg text-center p-4" style={{ borderRadius: "20px", background: "#f8f9fa" }}>
            <div className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                 style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(45deg, #1f2833, #0b0c10)", color: "#fff" }}>
              <i className="fa-solid fa-store fa-xl"></i>
            </div>
            <h5 className="fw-bold">Total Stores</h5>
<p className="text-muted">{totalStores}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-lg text-center p-4" style={{ borderRadius: "20px", background: "#f8f9fa" }}>
            <div className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                 style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(45deg, #1f2833, #0b0c10)", color: "#fff" }}>
              <i className="fa-solid fa-users fa-xl"></i>
            </div>
            <h5 className="fw-bold">Total Users</h5>
            <p className="text-muted">{users.length}</p>
          </div>
        </div>

        {/* Total Ratings */}
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-lg text-center p-4" style={{ borderRadius: "20px", background: "#f8f9fa" }}>
            <div className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                 style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(45deg, #1f2833, #0b0c10)", color: "#fff" }}>
              <i className="fa-solid fa-star fa-xl"></i>
            </div>
           <h5 className="fw-bold">Total Ratings</h5>
<p className="text-muted">{totalRatings}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-lg p-4" style={{ borderRadius: "20px", background: "#f8f9fa" }}>
        <h3 className="fw-bold mb-3">Users</h3>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Role Modal */}
      {selectedUser && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content p-4 rounded-4">
              <h5>Edit Role for {selectedUser.name}</h5>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="store_owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
                <button className="btn btn-success" onClick={handleUpdateRole}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
