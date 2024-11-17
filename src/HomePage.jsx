import { useEffect, useState } from 'react';
import apiClient from './config/axios';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const buttonBaseClass = "px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity";
  const primaryButtonClass = `${buttonBaseClass} bg-primary`;
  const secondaryButtonClass = `${buttonBaseClass} bg-secondary`;
  const logo = 'gis_logo.png';

  useEffect(() => {
    const getUserData = () => {
      apiClient.get("/users/current.json")
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    };

    if (isAuthenticated()) {
      getUserData();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      {/* Main container with max width and center alignment */}
      <div className="w-full max-w-2xl px-4">
        {/* Logo container */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            className="w-64 h-64 rounded-lg"
            alt="Get in Shape Logo"
          />
        </div>

        {/* Content box */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-800 mb-6">
            Welcome to Get In Shape
          </h1>
          
          <p className="text-gray-600 mb-8">
            We are here to help you find the exercises you want and save them to routines 
            so all you have to do is GET IN SHAPE!
          </p>
          
          <div>
            <h2 className="text-xl text-primary font-semibold mb-2">
              Hi {currentUser?.name || 'Fitness Enthusiast'}!
            </h2>
            <p className="text-gray-600 mb-6">What would you like to do today?</p>
            
            {isAuthenticated() ? (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/Exercises" className={primaryButtonClass}>
                  Browse Exercises
                </Link>
                <Link to="/routines" className={secondaryButtonClass}>
                  My Routines
                </Link>
                <Link to="/workout_log" className={secondaryButtonClass}>
                  Today&apos;s Routine
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/Exercises" className={primaryButtonClass}>
                  Browse Exercises
                </Link>
                <Link to="/login" className={secondaryButtonClass}>
                  Login
                </Link>
                <Link to="/signup" className={secondaryButtonClass}>
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;