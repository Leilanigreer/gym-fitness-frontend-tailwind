import apiClient from "./config/axios";
import { Link } from "react-router-dom";

export function LogoutLink({ className }) {
  const handleClick = (event) => {
    event.preventDefault();
    delete apiClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Link 
      className={`relative group ${className}`}
      to="/" 
      onClick={handleClick}
    >
      <span className="text-white/90 group-hover:text-white transition-colors duration-200">Logout</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
    </Link> 
  );
}