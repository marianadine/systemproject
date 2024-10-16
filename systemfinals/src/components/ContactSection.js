import React from 'react'
import './components_css/contactsectionstyle.css';
import logocontact from '../imgs/websitelogo.png';

const ContactSection = () => {
  return (
    <div>
      <section id='contactsection'>
        <img src={logocontact} alt="Logo" />
        <h1>Support our socials!</h1>
        <p>Stay connected and up-to-date with the latest news, offers, and updates. Follow us on our social media channels and help us grow!</p>
        
        <div className='contactbox'>            
            <div className='content1'>
                <h1>NU MOA Bulldogs Exchange</h1>
                <p>Your one-stop shop for exclusive NU MOA merchandise and more! Pre-order, pick up, and represent your school with pride.</p>
            </div>
            
            <div className='content2'>
                <h2>Shop</h2>
                <ul>
                    <li><a href="#">College</a></li>
                    <li><a href="#">Senior High School</a></li>
                    <li><a href="#">Merchandise</a></li>
                </ul>
            </div>
            
            <div className='content3'>
                <h2>Socials</h2>
                <a href="https://www.facebook.com/NUMOAph"><i className="fab fa-facebook"></i>: @NUMOAph</a>
                <h2>Contact Us!</h2>
                <a href="tel:+639985960424">(+63) 998 596 0424</a>
            </div>
        </div>
    </section>
    </div>
  )
}

export default ContactSection
