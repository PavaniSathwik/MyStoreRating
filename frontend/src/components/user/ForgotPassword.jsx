import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-3">Reset Password</h2>
          <p className="text-center text-muted mb-4">
            Enter your email and new password to reset your account
          </p>

          <form>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm new password"
                required
              />
            </div>

            {/* Reset Button */}
            <button type="submit" className="btn btn-dark w-100 mb-2">
              Reset Password
            </button>

            {/* Back to Sign In */}
            <div className="text-center">
              <a href="/login" className="text-decoration-none">
                Back to Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
