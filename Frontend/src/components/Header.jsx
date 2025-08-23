import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { user } = useAuth() || { user: null };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">Finance Dashboard</h1>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-chip">
            <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
            <div className="user-meta">
              <div className="user-name">{user.name}</div>
              <div className="user-sub">{user.email}</div>
            </div>
          </div>
        ) : (
          <div className="user-chip guest">Guest</div>
        )}
      </div>
    </header>
  );
};

export default Header;
