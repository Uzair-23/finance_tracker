import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { DataProvider } from '../context/DataContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

const AppLayout = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="app">
          <Sidebar />
          <main className="main">
            <Header />
            <Outlet />
          </main>
        </div>
      </DataProvider>
    </AuthProvider>
  );
};

export default AppLayout;


