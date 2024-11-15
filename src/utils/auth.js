// src/utils/auth.js
export const isAuthenticated = () => {
  return localStorage.jwt !== undefined;
};