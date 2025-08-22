import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Assuming you will create a CSS file for sidebar styles

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Finance Tracker</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/charts">Charts</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/budgets">Budgets</Link></li>
                <li><Link to="/goals">Goals</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;