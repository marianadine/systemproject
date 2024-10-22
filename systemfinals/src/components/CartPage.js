import React, { useState } from 'react';
import './components_css/cartpagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';

import product from "../imgs/merch/merch_nucap.png";

const CartPage = () => {
  const [quantities, setQuantities] = useState([3, 1]);

  const increaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const decreaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(newQuantities[index] - 1, 0); 
      return newQuantities;
    });
  };

  return (
    <div>
      <NavBar />
      <div className='carttop'>
        <h1>Cart Summary d rin final</h1>
        <p>We take extra care to ensure your products are safely packaged and securely shipped, so they arrive fresh and in perfect condition every time!</p>
      </div>

      <div className='cart-page'>
        <div className='productsadded'>
          <div className='productsaddedheader'>
            <p>Product</p>
            <p>Selling Price</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          
          {/* First Product */}
          <div className='individualproducts'>
            <div className='productimagename'>
              <img src={product} alt="Cap" />
              <p>Bulldogs Cap</p>
            </div>
            <p>PHP 199</p>
            <div className='quantity-control'>
              <button onClick={() => decreaseQuantity(0)} aria-label="Decrease quantity">
                <i className="fas fa-minus"></i>
              </button>
              <p>{quantities[0]}</p>
              <button onClick={() => increaseQuantity(0)} aria-label="Increase quantity">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <p>PHP {quantities[0] * 199}</p>
            <button aria-label="Delete product" className="delete-button">
              <i className="fas fa-trash"></i>
            </button>
          </div>
          
        </div>

        <div className='ordersummary'>
          <h1>Order Summary</h1>
          <div className='summary-item'>
            <p>Name:</p>
            <p>Maria Nadine Faye Rufo</p>
          </div>
          <div className='summary-item'>
            <p>Items:</p>
            <p>{quantities.reduce((sum, quantity) => sum + quantity, 0)}</p>
          </div>
          <div className='summary-item'>
            <p>Pickup Date:</p>
            <p>September 12, 2025</p>
          </div>
          
          <hr />
          
          <div className='summary-item'>
            <p>Payment Method:</p>
            <p>Over-the-Counter</p>
          </div>
          
          <div className='total-price'>
            <p>Total Price:</p>
            <p>PHP {quantities.reduce((sum, quantity) => sum + (quantity * 199), 0)}</p>
          </div>
          
          <button>Checkout</button>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default CartPage;
