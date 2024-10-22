import React, { useState } from 'react';
import './components_css/cartpagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';

import product from "../imgs/merch/merch_nucap.png"; // Example product image

const CartPage = () => {
  const [quantities, setQuantities] = useState([3, 1]);
  const [products, setProducts] = useState([
    { name: 'Bulldogs Cap', price: 199, image: product },
    { name: 'Other Product', price: 150, image: product }, // Example second product
  ]);

  // Helper function to calculate the total number of items in the cart
  const totalItems = () => quantities.reduce((sum, quantity) => sum + quantity, 0);

  const increaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      // Check if the total items in the cart is less than 5
      if (totalItems() < 5) {
        newQuantities[index] += 1;
      }
      return newQuantities;
    });
  };

  const decreaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const removeProduct = (index) => {
    setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
    setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <NavBar />
      <div className='carttop'>
        <h1>Cart Summary</h1>
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

          {products.map((product, index) => (
            <div className='individualproducts' key={index}>
              <div className='productimagename'>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>
              <p>PHP {product.price}</p>
              <div className='quantity-control'>
                <button onClick={() => decreaseQuantity(index)} aria-label="Decrease quantity">
                  <i className="fas fa-minus"></i>
                </button>
                <p>{quantities[index]}</p>
                <button onClick={() => increaseQuantity(index)} aria-label="Increase quantity">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <p>PHP {quantities[index] * product.price}</p>
              <button
                aria-label="Delete product"
                className="delete-button"
                onClick={() => removeProduct(index)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        <div className='ordersummary'>
          <h1>Order Summary</h1>
          <div className='summary-item'>
            <p>Name:</p>
            <p>Maria Nadine Faye Rufo</p>
          </div>
          <div className='summary-item'>
            <p>Items:</p>
            <p>{totalItems()}</p>
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
            <p>PHP {quantities.reduce((sum, quantity, index) => sum + (quantity * products[index].price), 0)}</p>
          </div>

          <button>Checkout</button>
        </div>
      </div>

      <ScrollToTopButton />
      <FeedbackPage />
      <ContactSection />
    </div>
  );
};

export default CartPage;
