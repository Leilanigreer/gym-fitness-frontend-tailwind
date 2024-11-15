import apiClient from "./config/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const location = useLocation ();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if(location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(()=> {
        setMessage("");
      }, 10000)
      return () => clearTimeout(timer)
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
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow hover-shadow-md transition rounded-4">
            <div className="card-body p-4 p-md-5">
              {message && (
                <div className="alert alert-success" role="alert" >{message}</div>
              )}
              <h1 className="display-6 mb-4 text-center">Login</h1>
              
              {errors.length > 0 && (
                <div className="alert alert-danger mb-4">
                  <ul>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control form-control-lg"
                    required
                  />
                </div>
              
                <button type="submit" className="btn btn-primary w-100 py-3 transition">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}