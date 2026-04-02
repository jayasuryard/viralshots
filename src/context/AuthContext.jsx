import { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/client';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);
  
  async function fetchUser() {
    try {
      const { data } = await apiClient.get('/auth/me');
      setUser(data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }
  
  async function login(email, password) {
    const { data } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data;
  }
  
  async function signup(email, password) {
    const { data } = await apiClient.post('/auth/signup', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data;
  }
  
  function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      apiClient.post('/auth/logout', { refreshToken }).catch(console.error);
    }
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  }
  
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
