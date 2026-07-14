import React from "react";
import { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";


const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await handleLogin(email, password);
      navigate("/");
    } catch (error) {
      setError(error?.message || "Login failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className='auth-loading-screen'>
        <div className='auth-loading-screen__card'>
          <div className='auth-loading-screen__spinner' />
          <h1>Signing you in...</h1>
          <p>Verifying credentials and preparing your workspace.</p>
          <div className='auth-loading-screen__progress'>
            <span>Checking your account</span>
            <span>Securing your session</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          {error && <div className="form-error" role="alert" aria-live="polite">{error}</div>}
          <button className="button primary-button" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  );
};

export default Login;
