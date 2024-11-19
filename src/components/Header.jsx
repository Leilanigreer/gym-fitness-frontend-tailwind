import { Link } from "react-router-dom";
import { LogoutLink } from "../LogoutLink";
import { isAuthenticated } from "../utils/auth";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const logo = 'gis_logo.png';
  let authenticationLinks;
  let routineLinks;

  if (!isAuthenticated()) {
    authenticationLinks = (
      <li className="flex items-center space-x-2">
        <Link 
          className="px-4 py-2 text-white border border-white/80 rounded-md hover:bg-white/10 transition-all duration-200" 
          to="/Signup"
        >
          Signup
        </Link>
        <Link 
          className="px-4 py-2 text-[#2D0A31] bg-white rounded-md hover:bg-white/90 transition-all duration-200" 
          to="/Login"
        >
          Login
        </Link>
      </li>
    );
  } else {
    authenticationLinks = (
      <li className="flex items-center">
        <LogoutLink className="px-3 py-2" />
      </li>
    );

    routineLinks = (
      <>
        <li>
          <Link 
            className="relative px-3 py-2 text-white/90 hover:text-white group transition-colors duration-200" 
            to="/routines"
          >
            My Routines
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </Link>
        </li>
        <li>
          <Link 
            className="relative px-3 py-2 text-white/90 hover:text-white group transition-colors duration-200" 
            to="/workout_log"
          >
            Today&apos;s Routines
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
          </Link>
        </li>
      </>
    );
  }

  return (
    <header className="shadow-sm sticky top-0 z-50 h-16">
      <nav className="bg-[#2D0A31] h-full">
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            <Link 
              className="flex items-center" 
              to="/"
            >
              <img 
                src={logo} 
                alt="Logo" 
                className="w-12 h-12 rounded"
              />
              <span className="ml-2 text-2xl font-bold text-white">G.I.S</span>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-1"
                aria-label="Toggle navigation"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:justify-between md:flex-1 ml-8">
              <ul className="flex items-center space-x-6">
                <li>
                  <Link 
                    className="relative px-3 py-2 text-white/90 hover:text-white group transition-colors duration-200" 
                    aria-current="page" 
                    to="/"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    className="relative px-3 py-2 text-white/90 hover:text-white group transition-colors duration-200" 
                    to="/Exercises"
                  >
                    Exercises
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-200"></span>
                  </Link>
                </li>
                {routineLinks}
              </ul>
              <ul className="flex items-center">
                {authenticationLinks}
              </ul>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <ul className="px-2 pt-2 pb-3 space-y-3">
              <li>
                <Link 
                  className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors duration-200" 
                  aria-current="page" 
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors duration-200" 
                  to="/Exercises"
                  onClick={() => setIsOpen(false)}
                >
                  Exercises
                </Link>
              </li>
              {routineLinks && (
                <div onClick={() => setIsOpen(false)} className="space-y-3">
                  {routineLinks}
                </div>
              )}
              <div onClick={() => setIsOpen(false)}>
                {authenticationLinks}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;