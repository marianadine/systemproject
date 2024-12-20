import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './components_css/signuppagestyle.css';
import LoadingPopUp from './LoadingPopUp'; 

import logo3 from '../imgs/websitelogo2.png';

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // email pattern and password validations -  @students.nu-moa.edu.ph
    const emailPattern = /^[a-zA-Z0-9._%+-]+@students\.nu-moa\.edu\.ph$/; 
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address ending with @students.nu-moa.edu.ph.");
      return;
    }

    if (firstName.length > 10 || lastName.length > 10) {
      alert("First and Last names must be 10 characters or less.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    
    // password pattern - 1 uppercase and 1 number
    const passwordUppercasePattern = /(?=.*[A-Z])(?=.*\d)/;
    if (!passwordUppercasePattern.test(password)) {
      alert("Password must contain at least one uppercase letter and one number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (selectedCourse) {
      setLoading(true);
      completeSignup();
    } else {
      alert("Please fill out all fields.");
    }
  };

  const completeSignup = () => {
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000); 
  };

  return (
    <section className='bgsec'>
      {loading && <LoadingPopUp />} {/* show loading component when loading */}
      <div className="signup-container">
        <img src={logo3} alt="NU MOA Logo" className="signup-logo" />
        <h2>Sign Up to continue</h2>
        <p>Please enter your school email address and password.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-inputs">
            <div className="name-input-group">
              <input 
                type="text" 
                placeholder="First Name" 
                required 
                maxLength={10} 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className="name-input-group">
              <input 
                type="text" 
                placeholder="Last Name" 
                required 
                maxLength={10}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
          </div>

          <div className="email-input-group">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              placeholder="School Email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="password-input-group">
            <i className="fas fa-lock"></i>
            <input
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password"
              required
              minLength={8}
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <i 
              className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }} 
            ></i>
          </div>

          <div className="confirmpassword-input-group">
            <i className="fas fa-lock"></i>
            <input
              type={passwordVisible ? "text" : "password"} 
              placeholder="Confirm Password"
              required
              minLength={8}
              maxLength={20}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <i 
              className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }} 
            ></i>
          </div>

          <div className="course-input-group">
            <select 
              required 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)} 
            >
              <option value="" disabled>Select Your Course</option>
              <option value="BS Architecture">BS Architecture</option>
              <option value="BS Financial Management">BS Financial Management</option>
              <option value="BS Information Technology - MWA">BS Information Technology - MWA</option>
              <option value="BS Marketing Management">BS Marketing Management</option>
              <option value="BS Medical Technology">BS Medical Technology</option>
              <option value="BS Nursing">BS Nursing</option>
              <option value="BS Psychology">BS Psychology</option>
              <option value="Doctor of Dental Medicine">Doctor of Dental Medicine</option>
              <option value="Doctor of Optometry">Doctor of Optometry</option>
              <option value="Senior High School">Senior High School</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          <p className="login-link">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
