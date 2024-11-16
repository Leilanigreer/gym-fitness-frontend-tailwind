import apiClient from "./config/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    
    const formData = {
      email: event.target.email.value.toLowerCase(),
      password: event.target.password.value
    };
    
    apiClient
      .post("/sessions.json", formData)
      .then((response) => {
        localStorage.setItem("jwt", response.data.jwt);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.jwt}`;
        window.location.href = "/";
      })
      .catch((error) => setErrors(error.response?.data?.errors || ["An error occurred"]));
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12">
      <div className="w-full max-w-lg rounded-lg bg-white p-11 shadow-xl">
        {/* Success Message */}
        {message && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700" role="alert">
            {message}
          </div>
        )}

        <h1 className="mb-8 text-center text-4xl font-semibold text-primary">Login</h1>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            <ul className="list-inside list-disc">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="mb-2 block text-base font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-base font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-md bg-primary text-base font-medium text-white transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}