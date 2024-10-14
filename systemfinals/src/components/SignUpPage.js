import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './components_css/signuppagestyle.css';

import logo3 from '../imgs/websitelogo2.png';

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const completeSignup = () => {
    navigate('/login'); 
  };

  return (
    <div className="signup-container">
      <img src={logo3} alt="NU MOA Logo" className="signup-logo" />
      <h2>Sign Up to continue</h2>
      <p>Please enter your school email address and password.</p>

      <form className="signup-form">
        <div className="name-inputs">
          <div className="name-input-group">
            <input type="text" placeholder="First Name" required />
          </div>
          <div className="name-input-group">
            <input type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className="email-input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="School Email" required />
        </div>

        <div className="password-input-group">
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

        <div className="course-input-group">
          <select required>
            <option value="" disabled selected>Select Your Course</option>
            <option value="architecture">BS Architecture</option>
            <option value="financial_management">BS Financial Management</option>
            <option value="information_technology">BS Information Technology - MWA</option>
            <option value="marketing_management">BS Marketing Management</option>
            <option value="medical_technology">BS Medical Technology</option>
            <option value="nursing">BS Nursing</option>
            <option value="psychology">BS Psychology</option>
            <option value="doctor_of_dental_medicine">Doctor of Dental Medicine</option>
            <option value="doctor_of_optometry">Doctor of Optometry</option>
            <option value="senior_high_school">Senior High School</option>
          </select>
        </div>

        <button type="submit" className="signup-btn" onClick={completeSignup}>Sign Up</button>

        <p className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpPage;
