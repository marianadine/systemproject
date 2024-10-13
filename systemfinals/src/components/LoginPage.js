import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginpagestyle.css';

import logo2 from '../imgs/websitelogo2.png';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const completeLogin = () => {
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <img src={logo2} alt="NU MOA Logo" className="logo2" />
      <h2>Log In to continue</h2>
      <p>Please log in with your school email address and password.</p>

      <form className="login-form">
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="School Email" required />
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type={passwordVisible ? "text" : "password"} 
            placeholder="Password"
            required
          />
          <i 
            className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} 
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer' }} 
          ></i>
        </div>

        <button type="submit" className="login-btn" onClick={completeLogin}>Log In</button>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
