import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    login({ name, email });
    nav('/account');
  };

  return (
    <div className="content">
      <div className="card form-card">
        <h3>Login</h3>
        <form onSubmit={submit} className="form">
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <button type="submit" className="btn primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
