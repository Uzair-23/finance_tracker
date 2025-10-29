import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';

const Sidebar = () => {
  const { month, setMonth } = useData();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="sidebar">
      <div className="brand">₹ Tracker</div>
      <nav className="nav">
        <Link className={isActive('/home')} to="/home">Home</Link>
        <Link className={isActive('/dashboard')} to="/dashboard">Dashboard</Link>
        <Link className={isActive('/add')} to="/add">Add Transaction</Link>
        <Link className={isActive('/assets')} to="/assets">Assets</Link>
      </nav>

      <div className="sidebar-footer">
        <label htmlFor="month">Month</label>
        <select id="month" value={month} onChange={(e)=>setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i+1} value={i+1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
