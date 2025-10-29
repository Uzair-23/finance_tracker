import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useAuth() || { user: null };
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">Finance Dashboard</h1>
      </div>
      <div className="header-right">
        {user ? (
          <div className="user-wrap" ref={menuRef}>
            <button className="user-chip" onClick={()=>setOpen(v=>!v)}>
              <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
              <div className="user-meta">
                <div className="user-name">{user.name}</div>
                <div className="user-sub">{user.username || user.email || 'Member'}</div>
              </div>
            </button>
            {open && (
              <div className="menu">
                <div className="menu-section">
                  <div className="menu-title">My Account</div>
                  <div className="menu-row"><span>Name</span><span>{user.name}</span></div>
                  {user.email && <div className="menu-row"><span>Email</span><span>{user.email}</span></div>}
                  {user.username && <div className="menu-row"><span>Username</span><span>{user.username}</span></div>}
                </div>
                <div className="menu-actions">
                  <button className="btn" onClick={logout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="user-chip guest">Guest</div>
        )}
      </div>
    </header>
  );
};

export default Header;
