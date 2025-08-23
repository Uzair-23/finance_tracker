import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Account = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="content">
        <div className="card">
          <h3>Not logged in</h3>
          <p>Please use Login or Signup to add your info.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="card">
        <h3>My Account</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
