import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';

const WebsiteController = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
}

export default WebsiteController;
