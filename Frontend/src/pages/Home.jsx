import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="content">
      <section className="hero card">
        <div className="hero-text">
          <h2>Track. Save. Grow.</h2>
          <p>Gain clear insights into your income, expenses, and savings. Get risk alerts and smart investment suggestions to grow your wealth.</p>
          <div className="hero-ctas">
            <Link to="/signup" className="btn primary">Get Started</Link>
            <Link to="/login" className="btn outline">Login</Link>
            <Link to="/dashboard" className="btn">View Dashboard</Link>
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-title">Savings Health</div>
            <div className="preview-gauge">
              <div className="gauge-fill" style={{ width: '72%' }} />
            </div>
            <div className="preview-sub">72% to target</div>
          </div>
          <div className="preview-card">
            <div className="preview-title">Suggested Mix</div>
            <ul className="mini-list">
              <li><span className="pill">Moderate</span><span>Index Funds</span><span>40%</span></li>
              <li><span className="pill">Low</span><span>Debt Funds</span><span>20%</span></li>
              <li><span className="pill">Hedge</span><span>Gold</span><span>10%</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <h3>Why use Finance Tracker?</h3>
        <div className="accordion">
          <details open>
            <summary>Automatic risk checks</summary>
            <p>We alert you if your savings fall below 20% of your monthly income.</p>
          </details>
          <details>
            <summary>Actionable suggestions</summary>
            <p>Get investment ideas based on market trends and risk appetite.</p>
          </details>
          <details>
            <summary>Clean, modern UI</summary>
            <p>Focused on clarity, speed, and decision-making.</p>
          </details>
        </div>
      </section>
    </div>
  );
};

export default Home;


