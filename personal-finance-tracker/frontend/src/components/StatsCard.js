import React from 'react';
import './StatsCard.css'; // Assuming you will create a CSS file for styling

const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="stats-card">
            <div className="stats-card-icon">{icon}</div>
            <div className="stats-card-content">
                <h3 className="stats-card-title">{title}</h3>
                <p className="stats-card-value">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;