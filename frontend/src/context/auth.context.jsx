// src/context/auth.context.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenInStore = localStorage.getItem("token");
    if (tokenInStore) {
      setToken(tokenInStore);
      axios.defaults.headers.common["Authorization"] = tokenInStore;
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    axios.defaults.headers.common["Authorization"] = token; // Token without Bearer
    setUser(true); // You can store more user data if needed
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"]; // Clear token from headers
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
