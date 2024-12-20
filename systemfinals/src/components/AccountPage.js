import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './components_css/accountspagestyle.css';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';
import NavBar from './NavBar';
import defpfp from '../imgs/defaultpfp.jpg';
import ContactSection from './ContactSection';
import ChangePasswordPopup from './ChangePasswordPopup';
import ConfirmationModal from './ConfirmationModal';

const AccountPage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profilePic, setProfilePic] = useState(defpfp); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const toLogout = () => {
        setIsModalOpen(false);
        navigate('/login'); 
    };

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        toLogout(); 
    };

    const handleCancelLogout = () => {
        setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); 
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleSave = () => {
        // Save the selected file to DB logic here
        handleEditClick();
        setSelectedFile(null);
    };

    const handleChangePassword = (currentPassword, newPassword) => {
        console.log('Password change request:', { currentPassword, newPassword });
    };

    const setSelectedCategory = (category) => {
        navigate('/products', { state: { selectedCategory: category } });
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
                        <img src={profilePic} alt="Profile Picture" className="profile-pic" />
                        <div className="info">
                            <h4>Maria Nadine Faye Rufo</h4>
                            <p>BS Information Technology</p>
                        </div>
                        <button
                            className="edit-button"
                            onClick={isEditing ? handleSave : handleEditClick}
                            style={{
                                backgroundColor: isEditing ? '#f6d130' : '',
                            }}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    
                    {isEditing && (
                        <div className="file-input-group">
                            <label className="file-input-label">Choose a new profile picture:</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="file-input" 
                            />
                            {selectedFile && (
                                <p style={{ marginTop: '10px' }}>Selected File: {selectedFile.name}</p>
                            )}
                        </div>
                    )}

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
                            <button className='changepassbtn' onClick={() => setIsChangingPassword(true)}>Change Password</button>
                        </div>
                    </div>

                    <button className="logout" onClick={handleLogoutClick}>Logout</button>
                </div>
              </div>
            </section>

            {isChangingPassword && (
                <ChangePasswordPopup
                    onClose={() => setIsChangingPassword(false)}
                    onChangePassword={handleChangePassword}
                />
            )}

            {/* confirmation Modal for Logout */}
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onClose={handleCancelLogout} 
                onConfirm={handleConfirmLogout} 
            />

            <ContactSection setSelectedCategory={setSelectedCategory} />
            <FeedbackPage />
            <ScrollToTopButton />
        </div>
    );
};

export default AccountPage;
