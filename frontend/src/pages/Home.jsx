import React from "react";

function Home() {
  return (
    <>
      {/* Welcome Section */}
      <main
        className="d-flex flex-column justify-content-center align-items-center text-center bg-light"
        style={{ height: "50vh" }}
      >
        <div>
          <h1 className="display-4 fw-bold mb-3">Welcome to Store Rating App</h1>
          <p className="lead mb-3">
            Rate your favorite stores and explore ratings from others.
          </p>
          <a href="#cta-section" className="btn btn-dark btn-lg rounded-pill">
            Get Started
          </a>
        </div>
      </main>

      {/* 50% Height Image Section */}
      <section className="d-flex flex-wrap" style={{ height: "50vh", width: "100%" }}>
        {/* Left half with photo */}
        <div className="col-12 col-md-6 p-0" style={{ height: "100%" }}>
          <div
            className="h-100 w-100"
            style={{
              backgroundImage: "url('/homeimage1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Right half with second photo */}
        <div className="col-12 col-md-6 p-0" style={{ height: "100%" }}>
          <div
            className="h-100 w-100"
            style={{
              backgroundImage: "url('/homeimage2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </section>

      {/* Flow Section */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">How It Works</h2>

        {/* User Flow */}
        <h3 className="mb-4 text-center fw-bold text-muted">User Flow</h3>
        <div className="row justify-content-center mb-5 gx-4 gy-4">
          {/* Step 1 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-user-plus fa-xl"></i>
              </div>
              <h5 className="fw-bold">Sign Up / Login</h5>
              <p className="text-muted">Create an account or login to get started.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
              </div>
              <h5 className="fw-bold">Search</h5>
              <p className="text-muted">Find your favorite stores and businesses.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-star fa-xl"></i>
              </div>
              <h5 className="fw-bold">Rate</h5>
              <p className="text-muted">Share your experience by rating stores.</p>
            </div>
          </div>
        </div>

        {/* Owner Flow */}
        <h3 className="mb-4 text-center fw-bold text-muted">Owner Flow</h3>
        <div className="row justify-content-center gx-4 gy-4">
          {/* Step 1 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-user-tie fa-xl"></i>
              </div>
              <h5 className="fw-bold">Owner Login</h5>
              <p className="text-muted">Access your dedicated owner dashboard.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-store fa-xl"></i>
              </div>
              <h5 className="fw-bold">Manage Store</h5>
              <p className="text-muted">Add and edit your store info and photos.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 border-0 shadow-lg text-center p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center mb-3 mx-auto"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #1f2833, #0b0c10)",
                  color: "#fff",
                }}
              >
                <i className="fa-solid fa-chart-simple fa-xl"></i>
              </div>
              <h5 className="fw-bold">View Ratings</h5>
              <p className="text-muted">Check real-time user ratings and average scores.</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Call-to-Action Section */}
      <section id="cta-section" className="container-fluid py-5" style={{ minHeight: "60vh" }}>
        <div className="row justify-content-center g-5 h-100">
          {/* New User Block (Register) */}
          <div className="col-12 col-lg-6 d-flex align-items-stretch">
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center p-5 rounded-4 shadow-lg w-100"
              style={{
                background: "linear-gradient(45deg, #343a40, #495057)",
                color: "#f8f9fa",
              }}
            >
              <h3 className="fw-bold mb-3">Are you a new user?</h3>
              <p className="lead mb-4">
                Want to rate a store you recently visited? Join our community!
              </p>
              <a href="/register" className="btn btn-light btn-lg rounded-pill px-5">
                Register
              </a>
            </div>
          </div>

          {/* Existing User Block (Sign In) */}
          <div className="col-12 col-lg-6 d-flex align-items-stretch">
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center p-5 rounded-4 shadow-lg w-100"
              style={{
                background: "linear-gradient(45deg, #e9ecef, #f8f9fa)",
                color: "#212529",
              }}
            >
              <h3 className="fw-bold mb-3">Already a member?</h3>
              <p className="lead mb-4">
                Sign in to manage your ratings or view your dashboard.
              </p>
              <a href="/login" className="btn btn-dark btn-lg rounded-pill px-5">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;