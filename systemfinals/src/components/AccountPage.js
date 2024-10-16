import React from 'react'
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';

const AccountPage = () => {

  const navigate = useNavigate();
  const toLogout = () => {
    navigate('/login'); 
  };

  return (
    <div>
        <NavBar />
        <h1>ACCOUNT</h1>
        <button className="logout" onClick={toLogout}>Logout</button>        

    </div>
  )
}

export default AccountPage
