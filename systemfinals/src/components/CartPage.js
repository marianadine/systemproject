import React from 'react'
import './components_css/cartpagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';

const CartPage = () => {
  return (
    <div>
      <NavBar />
      <div className='carttop'>
        <h1>Cart Summary</h1>  
        <p>We take extra care to ensure your products are safely packaged and securely shipped, so they arrive fresh and in perfect condition every time!</p>
      </div>

      <div className='main'>
        <div className='productsadded'> 
          
        </div>

        <div className='ordersummary'>
          <h1>Order Summary</h1>
          <p>Name: Maria Nadine Faye Rufo</p>
          <p>Items: 5</p>
          <p>Pickup Date: September 12, 2025</p>
          <hr></hr>
          <h2>Payment Method</h2>
          <p> Over-the-Counter</p>
          <h2>Total Price: PHP 900</h2>
          <button>Checkout</button>
        </div>
      </div>

      <ContactSection/>
    </div>
  )
}

export default CartPage;
