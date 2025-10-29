import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('ft_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('ft_user', JSON.stringify(user));
    else localStorage.removeItem('ft_user');
  }, [user]);

  const login = ({ name, email, username }) => setUser({ name, email, username });
  const logout = () => setUser(null);

  const signup = ({ name, username, password }) => {
    const users = JSON.parse(localStorage.getItem('ft_users') || '{}');
    if (users[username]) throw new Error('Username already exists');
    users[username] = { name, username, passwordHash: password };
    localStorage.setItem('ft_users', JSON.stringify(users));
    setUser({ name, username });
  };

  const loginWithPassword = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('ft_users') || '{}');
    const record = users[username];
    if (!record || record.passwordHash !== password) throw new Error('Invalid credentials');
    setUser({ name: record.name, username: record.username });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
