import React, { useState } from 'react';

import './homepagestyle.css'; 

import NavBar from './NavBar';
import ScrollToTopButton from './ScrollToTopButton';

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

      </section>

      <section>
                
      </section>

      <ScrollToTopButton />
    </div>
  )
}

export default HomePage;
