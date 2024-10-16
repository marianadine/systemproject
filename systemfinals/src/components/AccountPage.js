import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './components_css/accountspagestyle.css';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';

import NavBar from './NavBar';
import defpfp from '../imgs/defaultpfp.jpg';
import ContactSection from './ContactSection';

const AccountPage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const toLogout = () => {
        navigate('/login'); 
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <NavBar />

            <section className='top'>
              <div id="account-settings">
                <h2 className='title'>Account Settings</h2>
                <div className="account-info">
                    <h3>My Account</h3>
                    <div className="account-details">
                        <img src={defpfp} alt="Profile Picture" className="profile-pic" />
                        <div className="info">
                            <h4>Maria Nadine Faye Rufo</h4>
                            <p>BS Information Technology</p>
                        </div>
                        <button
                            className="edit-button"
                            onClick={handleEditClick}
                            style={{
                                backgroundColor: isEditing ? '#f6d130' : '',
                            }}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    
                    <h3>Personal Information</h3>
                    <div className="personal-info">

                        <div className="info-item">
                            <strong>Last Name</strong>
                            <p>Rufo</p>
                        </div>
                        <div className="info-item">
                            <strong>First Name</strong>
                            <p>Maria Nadine Faye</p>
                        </div>
                        <div className="info-item">
                            <strong>Course</strong>
                            <p>BS Information Technology</p>
                        </div>
                        <div className="info-item">
                            <strong>School Email</strong>
                            <p>rufoml@students.nu-moa.edu.ph</p>
                        </div>
                        <div className="info-item">
                            <strong>Password</strong>
                            <p>ilovemikmik123</p>
                        </div>
                    </div>
                    <button className="logout" onClick={toLogout}>Logout</button>
                    </div>
                    </div>
              </section>


            <ContactSection/>
            <FeedbackPage />
            <ScrollToTopButton />

        </div>
    );
};

export default AccountPage;
