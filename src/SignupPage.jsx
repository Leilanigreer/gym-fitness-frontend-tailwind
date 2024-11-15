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
          state: {message: "Signup successful! Login to start your workout journey."}
        });
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow hover-shadow-md transition rounded-4">
            <div className="card-body p-4 p-md-5">
              <h1 className="display-6 mb-4 text-center">Signup</h1>
              
              {errors.length > 0 && (
                <div className="alert alert-danger mb-4">
                  <ul className="list-unstyled m-0">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    type="text" 
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    id="password"
                    name="password" 
                    type="password" 
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password_confirmation" className="form-label">
                    Password confirmation
                  </label>
                  <input 
                    id="password_confirmation"
                    name="password_confirmation" 
                    type="password" 
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-3 transition">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}