import { useEffect, useState } from 'react';
import apiClient from './config/axios';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState({});
  const logo = 'gis_purple487.png';
  const buttonBaseClass = "w-full md:w-36 px-3 py-2 rounded-full text-white text-xl md:text-xs font-normal text-center whitespace-nowrap";
  const primaryButtonClass = `${buttonBaseClass} bg-primary`;
  const secondaryButtonClass = `${buttonBaseClass} bg-secondary`;

  const ActionButtons = ({ isAuthenticated }) => (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      {isAuthenticated ? (
        <>
          <Link to="/exercises" className={primaryButtonClass}>
            Browse Exercises
          </Link>
          <Link to="/routines" className={secondaryButtonClass}>
            My Routines
          </Link>
          <Link to="/workout_log" className={secondaryButtonClass}>
            Today&apos;s Routine
          </Link>
        </>
      ) : (
        <>
          <Link to="/exercises" className={primaryButtonClass}>
            Browse Exercises
          </Link>
          <Link to="/login" className={secondaryButtonClass}>
            Login
          </Link>
          <Link to="/signup" className={secondaryButtonClass}>
            Signup
          </Link>
        </>
      )}
    </div>
  );

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

  const WelcomeMessage = ({ currentUser }) => (
    <h2 className=" text-4xl lg:text-5xl font-bold mb-2 tracking-tight leading-tight">
      {isAuthenticated() 
        ? `Hi ${currentUser?.name}!`
        : "Get In Shape"}
    </h2>
  );

  return (
    <div className="flex items-start justify-center w-full pt-8 md:pt-20 lg:pt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl px-4 md:px-0">
        {/* Right side - Logo */}
        <div className="flex items-center justify-center order-first md:order-last">
          <div className="w-3/4 max-w-md"> {/* Container to control logo size */}
            <img 
              src={logo} 
              alt="Get in Shape Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        {/* Left side - Content */}
        <div className="flex flex-col space-y-6 order-last md:order-first">
          <WelcomeMessage currentUser={currentUser} />
          <p className="text-slate-500 text-xl md:text-md leading-relaxed font-normal">
            We are here to help you find the exercises you want and save them to routines 
            so all you have to do is GET IN SHAPE!
          </p>
          {isAuthenticated() && (
            <p className="text-slate-500 text-xl md-text-md leading-relaxed font-normal">
              What would you like to do today?
            </p>
          )}
          <ActionButtons isAuthenticated={isAuthenticated()} />
        </div>
  
      </div>
    </div>
  );
};

export default HomePage;