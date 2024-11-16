import apiClient from "./config/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-full items-center justify-center ">
      {/* White container with shadow */}
      <div className="w-full max-w-lg rounded-lg bg-white p-11 shadow-xl">
        <h1 className="mb-8 text-center text-4xl font-semibold text-primary">Signup</h1>

        {errors.length > 0 && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            <ul className="list-inside list-disc">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700">
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
            <label htmlFor="password" className="block text-base font-semibold text-gray-700">
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

          <div>
            <label htmlFor="password_confirmation" className="block text-base font-semibold text-gray-700">
              Password confirmation
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
              className="mt-2 block h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-md bg-primary text-base font-medium text-white transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}