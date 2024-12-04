import { useState, useEffect } from "react";
import { Mail, Lock, AlertCircle, Dumbbell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from "./config/axios";

const handleSuccessfulLogin = (jwt) => {
  // Set JWT in localStorage
  localStorage.setItem("jwt", jwt);
  // Set Authorization header
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  // Dispatch auth change event
  window.dispatchEvent(new Event('authChange'));
};

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    params.set('email', params.get('email').toLowerCase());
    
    try {
      setIsLoading(true);
      const response = await apiClient.post("/sessions.json", params);
      handleSuccessfulLogin(response.data.jwt);
      event.target.reset();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setErrors(["Invalid email or password"]);
      } else {
        setErrors(["An error occurred. Please try again."]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrors([]);
    const credentials = {
      email: 'leilani@test.com',
      password: 'password'
    };

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set('email', credentials.email);
      formData.set('password', credentials.password);
      
      const response = await apiClient.post("/sessions.json", formData);
      handleSuccessfulLogin(response.data.jwt);
      navigate('/');
    } catch (error) {
      console.error('Demo login error:', error);
      setErrors(["Failed to log in with demo account. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {message && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700 items-center" role="alert">
            {message}
          </div>
        )}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Get In Shape
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-6">
          {errors.length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                         shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary 
                         transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Try a demo account</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-2 border border-primary 
                         rounded-md shadow-sm text-sm font-medium text-primary bg-white 
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-primary transition-colors duration-200 disabled:opacity-50"
              >
                <Dumbbell className="h-4 w-4 mr-2" />
                Try Demo Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;