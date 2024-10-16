import React, { useState } from 'react';

import './components_css/homepagestyle.css';

import NavBar from './NavBar';
import ScrollToTopButton from './ScrollToTopButton';

import f1 from "../imgs/f1.png";
import f2 from "../imgs/f2.png";
import f3 from "../imgs/f3.png";

const HomePage = () => {
  const [selectedSize, setSelectedSize] = useState('');

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

  return (
    <div>
      <NavBar />

      <section className="top-section">
        <div className="top-content">
            <h1>Wear your pride,</h1>
            <h1>Embrace the blue.</h1>
          <p>
            We're thrilled to have you here! Whether you're cheering in the stands or going about your daily routine,
            our gear will keep you connected to the spirit and excellence of NU.
          </p>
            <button className="shopnowbtn">Shop Now</button>
        </div>
      </section>


      <div className="notice-section">
        <p>
          Welcome NU Bulldogs! Take note that there are no deliveries available yet. All orders are to be scheduled for pick-up.
        </p>
      </div>

      <section className='fullfeature'>
        <div className='features'>
          <div className="feature">
            <div className="feature-content">
              <img src={f1} alt="Product" className="feature-icon" />
              <div className="text-content">
                <h3>Scheduled Pickup Orders</h3>
                <p>Keeps the pickup process organized, preventing overcrowding and long waits.</p>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img src={f2} alt="Product" className="feature-icon" />
              <div className="text-content">
                <h3>Exclusive for NU MOA Students</h3>
                <p>Exclusively for NU MOA students, who can access the services for orders.</p>
              </div>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <img src={f3} alt="Product" className="feature-icon" />
              <div className="text-content">
                <h3>Feedback Management</h3>
                <p>Allows students to provide feedback on their experiences or suggestions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='ftrdproducts'>
        <h1>Featured Products</h1>
        
        <div className="product-card">
            <div className="product-image">
                <img src="path/to/your/image.jpg" alt="Product" />
            </div>
            <h2 className="product-name">Product Name</h2>
            <div className="size-options">
                {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                        key={size}
                        className={`size-button ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => handleSizeClick(size)}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <p className="product-description">Short description of the product.</p>
            <div className="price-container">
                <span className="price">PHP 450</span>
                <i className="fas fa-cart-plus icon"></i>
            </div>
        </div>
        <button className="viewall">View All</button>        
      </section>

      <ScrollToTopButton />
    </div>
  )
}

export default HomePage;
