// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import StoreOwnerDashboard from "./components/owner/StoreOwnerDashboard";
import StoreList from "./components/user/StoreList";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/admin/AdminNavbar";
import UserNavbar from "./components/user/UserNavbar";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userRole = localStorage.getItem("userRole"); // "store_owner" or "normal"
  const [search, setSearch] = useState("");

  return (
    <Router>
      <AppContent isAdmin={isAdmin} userRole={userRole} search={search} setSearch={setSearch} />
    </Router>
  );
}

function AppContent({ isAdmin, userRole, search, setSearch }) {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "User";

  let navbarToShow = null;
  if (isAdmin && location.pathname.startsWith("/admin")) {
    navbarToShow = <AdminNavbar />;
  } else if (userRole === "store_owner" && location.pathname === "/owner-dashboard") {
    navbarToShow = null; // owner dashboard handles its own navbar
  } else if (userRole === "normal" && location.pathname === "/user-dashboard") {
    navbarToShow = (
      <UserNavbar
        userName={userName}
        search={search}
        setSearch={setSearch}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      />
    );
  } else {
    navbarToShow = <Navbar />; // public pages
  }

  return (
    <>
      {navbarToShow}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin/AdminDashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/owner-dashboard"
          element={userRole === "store_owner" ? <StoreOwnerDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-dashboard"
          element={userRole === "normal" ? <StoreList search={search} setSearch={setSearch} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
