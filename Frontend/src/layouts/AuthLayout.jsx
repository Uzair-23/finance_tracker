import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="auth-brand">
          <Link to="/" className="brand-link">₹ Tracker</Link>
        </div>
        <Outlet />
      </div>
      <div className="auth-art">
        <div className="money-wall" aria-hidden>
          <span className="rupee ru1">₹</span>
          <span className="rupee ru2">₹</span>
          <span className="rupee ru3">₹</span>
          <span className="rupee ru4">₹</span>
          <span className="rupee ru5">₹</span>
          <span className="rupee ru6">₹</span>
          <span className="rupee ru7">₹</span>
          <span className="rupee ru8">₹</span>
          <span className="rupee ru9">₹</span>
        </div>
        <div className="art-card">
          <div className="art-title">Your money, clear and simple.</div>
          <div className="art-sub">Budget, invest, and grow with confidence.</div>
          <div className="hero-ctas" style={{ marginTop: 12 }}>
            <Link to="/signup" className="btn primary">Create Account</Link>
            <Link to="/login" className="btn">Go to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;


