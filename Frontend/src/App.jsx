import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import Assets from './pages/Assets.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
