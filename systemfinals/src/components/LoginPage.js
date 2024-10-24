import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/loginpagestyle.css';

import LoadingPopUp from './LoadingPopUp'; 

import logo2 from '../imgs/websitelogo2.png';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
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

    setLoading(true);
    completeLogin();
  };

  const completeLogin = () => {
    setTimeout(() => {
      setLoading(false);
      navigate('/home'); 
    }, 2000);
  };

  return (
    <section className='bgsec'>
      {loading && <LoadingPopUp />} {/* show loading component when loading */}
      <div className="login-container">
        <img src={logo2} alt="NU MOA Logo" className="logo2" />
        <h2>Log In to continue</h2>
        <p>Please log in with your school email address and password.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              placeholder="School Email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <i 
              className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"} 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }} 
            ></i>
          </div>

          <button type="submit" className="login-btn">Log In</button>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
