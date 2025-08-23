import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/core/Navbar';
// We no longer need ProtectedRoute, LoginPage, or RegisterPage
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      {/* AuthProvider can be kept in case you add features later, it won't cause issues */}
      <AuthProvider>
        <Navbar />
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }} />
        <div className="container">
          <Routes>
            {/* The login and register routes have been removed. */}
            
            {/* The main route now directly shows the DashboardPage without protection. */}
            <Route 
              path="/" 
              element={<DashboardPage />} 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
