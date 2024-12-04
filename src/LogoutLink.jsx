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
      className={`relative px-2 py-1 md:text-sm text-lg text-white/90 hover:text-white group transition-colors duration-200 ${className}`}
      to="/" 
      onClick={handleClick}
    >
      Logout
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
    </Link> 
  );
}