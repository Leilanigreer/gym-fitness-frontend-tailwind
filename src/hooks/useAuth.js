// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuth(isAuthenticated());
    };

    // Listen for storage changes (in case JWT is modified in another tab)
    window.addEventListener('storage', handleAuthChange);
    // Listen for custom auth events (for login/logout)
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return isAuth;
};