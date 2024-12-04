import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./config/axios";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    formData.set('email', formData.get('email').toLowerCase());

    apiClient
      .post("/users.json", formData)
      .then(() => {
        event.target.reset();
        navigate("/login", {
          state: { message: "Signup successful! Login to start your workout journey." }
        });
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="flex min-h-screen flex-col sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Get In Shape
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
          {errors.length > 0 && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <ul className="list-inside list-disc">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block h-10 w-full rounded-md border border-gray-300 px-3 shadow-sm 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block h-10 w-full rounded-md border border-gray-300 px-3 shadow-sm 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block h-10 w-full rounded-md border border-gray-300 px-3 shadow-sm 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Password confirmation
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="mt-1 block h-10 w-full rounded-md border border-gray-300 px-3 shadow-sm 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-md bg-primary text-sm font-medium text-white 
                       transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 
                       focus:ring-primary focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;