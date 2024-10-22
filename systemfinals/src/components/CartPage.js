import React, { useState } from 'react';
import './components_css/cartpagestyle.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';
import ConfirmationModal from './ConfirmationModal'; // Ensure this path is correct

import product from "../imgs/merch/merch_nucap.png"; // Example product image

const CartPage = () => {
  const [quantities, setQuantities] = useState([3, 1]);
  const [products, setProducts] = useState([
    { name: 'Bulldogs Cap', price: 199, image: product },
    { name: 'Other Product', price: 150, image: product }, // Example second product
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

  const navigate = useNavigate();
  const setSelectedCategory = (category) => {
    navigate('/products', { state: { selectedCategory: category } });
  };

  // function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Cart Summary', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Name: Maria Nadine Faye Rufo`, 14, 30);
    doc.text(`Items: ${totalItems()}`, 14, 36);
    doc.text(`Pickup Date: September 12, 2025`, 14, 42);
    
    doc.text('Products:', 14, 50);
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - PHP ${product.price} x ${quantities[index]} = PHP ${quantities[index] * product.price}`, 14, 56 + index * 6);
    });

    const totalPrice = quantities.reduce((sum, quantity, index) => sum + (quantity * products[index].price), 0);
    doc.text(`Total Price: PHP ${totalPrice}`, 14, 56 + products.length * 6);
    
    // save the PDF
    doc.save('cart_summary.pdf');

    // clear the cart
    setQuantities([]);
    setProducts([]);
  };

  const handleCheckout = () => {
    generatePDF(); // Generate the PDF
    setIsModalOpen(false); // Close the modal
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

          <button onClick={() => setIsModalOpen(true)}>Checkout</button> {/* Open modal on click */}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleCheckout} 
        />
      </div>

      <ScrollToTopButton />
      <FeedbackPage />
      <ContactSection setSelectedCategory={setSelectedCategory} />
    </div>
  );
};

export default CartPage;
