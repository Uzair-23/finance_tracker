import React from 'react';
import StatsCard from './StatsCard';
import Chart from './Chart';
import Calendar from './Calendar';
import Activities from './Activities';
import './Dashboard.css'; // Assuming you will create a CSS file for specific styles

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Personal Finance Dashboard</h2>
            <div className="stats-container">
                <StatsCard title="Total Income" value="$5,000" />
                <StatsCard title="Total Expenses" value="$3,000" />
                <StatsCard title="Savings" value="$2,000" />
            </div>
            <div className="charts-container">
                <Chart />
            </div>
            <div className="calendar-container">
                <Calendar />
            </div>
            <div className="activities-container">
                <h3>Recent Activities</h3>
                <Activities />
            </div>
        </div>
    );
};

export default Dashboard;