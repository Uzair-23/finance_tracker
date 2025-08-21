import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Finance Tracker</h1>
      <p className="text-lg mb-8 text-gray-300 text-center max-w-xl">
        Manage your expenses, track your budget, and get AI-powered forecasts to
        plan your financial future smarter.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
