import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import './styles/theme.css';

const Home = () => {
    return (
        <div className="home-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <Dashboard />
            </div>
        </div>
    );
};

export default Home;