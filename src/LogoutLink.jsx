import apiClient from "./config/axios";
import { useNavigate } from "react-router-dom";

export function LogoutLink({ className, onClick }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    
    delete apiClient.defaults.headers.common["Authorization"];
    
    localStorage.removeItem("jwt");
    
    window.dispatchEvent(new Event('authChange'));
    
    onClick?.(); 
    
    navigate('/');
  };

  const defaultClass = "block px-2 py-2 text-xl text-white hover:bg-white/10 rounded-md transition-colors duration-200 md:relative md:px-2 md:py-1 md:text-sm md:text-white/90 md:hover:text-white md:hover:bg-transparent md:group";
  
  return (
    <button 
      className={`${defaultClass} ${className || ''}`}
      onClick={handleClick}
    >
      Logout
      <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
    </button> 
  );
}