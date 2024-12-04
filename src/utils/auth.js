// src/utils/auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem('jwt');
  return token !== null && token !== '';
};