import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    try{
      signup({ name, username, password });
      nav('/dashboard');
    }catch(e){
      setError(e.message || 'Signup failed');
    }
  };

  return (
    <div className="content">
      <div className="auth-slide from-right">
        <div className="card form-card auth">
          <h2>Create account</h2>
          <p className="muted">Start your journey to better money decisions</p>
          <div className="money-anim" aria-hidden>
            <span className="rupee r1">₹</span>
            <span className="rupee r2">₹</span>
            <span className="rupee r3">₹</span>
            <span className="rupee r4">₹</span>
            <span className="rupee r5">₹</span>
            <span className="rupee r6">₹</span>
          </div>
          <form onSubmit={submit} className="form">
            <label>Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your Name" />
            <label>Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} required placeholder="yourname" />
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" />
            {error && <div className="notice danger">{error}</div>}
            <button type="submit" className="btn primary">Create Account</button>
          </form>
          <div className="muted" style={{ marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
          <div className="muted" style={{ marginTop: 4 }}>Go back to <Link to="/home">Home</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
