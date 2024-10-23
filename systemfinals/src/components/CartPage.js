import React, { useState } from 'react';
import './components_css/cartpagestyle.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';
import ConfirmationModal from './ConfirmationModal'; 

import product from "../imgs/merch/merch_nucap.png"; // ex. product image
import product1 from "../imgs/college/college_femaleblouse.png"; // ex. product image

const CartPage = () => {
  const [quantities, setQuantities] = useState([3, 1]);
  const [products, setProducts] = useState([
    { name: 'Bulldogs Cap', price: 199, image: product },
    { name: 'Female Traditional Blouse (M)', price: 560, image: product1 }, // ex. second product
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = () => quantities.reduce((sum, quantity) => sum + quantity, 0);

  const increaseQuantity = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      // check if the total items in the cart is less than 5
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
  const generatePDF = (orderId) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('NU MOA Bulldogs Exchange', 14, 10);
    doc.setFontSize(10);
    doc.text('Order Summary', 14, 18); 
    doc.line(10, 20, 200, 20); 

    // User Info
    doc.setFontSize(12);
    doc.text(`Name: Maria Nadine Faye Rufo`, 14, 25);
    doc.text(`Items: ${totalItems()}`, 14, 30);
    doc.text(`Pickup Date: September 12, 2025`, 14, 35);

    doc.text('', 14, 40); 

    doc.setFontSize(12);
    doc.text('Products:', 14, 45);

    doc.setFontSize(10);
    products.forEach((product, index) => {
      const yPosition = 50 + index * 10; 
      doc.text(`${index + 1}. ${product.name}`, 14, yPosition);

      const priceXPosition = 170; 
      doc.text(`PHP ${product.price} x ${quantities[index]} = PHP ${quantities[index] * product.price}`, priceXPosition, yPosition, { align: 'right' }); 
    });

    // Calculate total price
    const totalPrice = quantities.reduce((sum, quantity, index) => sum + (quantity * products[index].price), 0);
    
    // Position and format total price
    const totalYPosition = 50 + products.length * 10; 
    doc.setFontSize(12); 
    doc.setFont(undefined, 'bold');
    doc.text(`Total Price: PHP ${totalPrice}`, 170, totalYPosition, { align: 'right' });

    doc.line(10, 20, 200, 20); 

    const thankYouMessage = 'Thank you for your purchase! Please present this along with your school ID to the cashier when you come to pick up your order.';
    const messageXPosition = doc.internal.pageSize.getWidth() / 2;
    doc.setFontSize(8);
    doc.text(thankYouMessage, messageXPosition, totalYPosition + 10, { align: 'center', baseline: 'middle' }); 

    // Save the PDF with a unique name
    const fileName = `Order_${orderId}_Maria_Nadine_Faye_Rufo.pdf`; // Generate unique order ID
    doc.save(fileName);

    // Clear the cart
    setQuantities([]);
    setProducts([]);
  };

  const handleCheckout = () => {
    generatePDF(); 
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <div className='carttop'>
        <h1>Cart Summary</h1>
        <p>We take extra care to ensure your products are safely packaged and securely shipped, so they arrive fresh and in perfect condition every time!</p>
      </div>

      <div className='cart-page'>
        {products.length === 0 ? (
          <div className='empty-cart'>
            <h2>Cart is empty</h2>
            <p>Your cart is currently empty. Browse our products and add items to your cart.</p>
            <button onClick={() => navigate('/products')} className="browse-button">
              Browse Products
            </button>
          </div>
        ) : (
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
                <button className="delete-button" onClick={() => removeProduct(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='ordersummary'>
          <h1>Order Summary</h1>
          <div className='summary-item'>
            <p>Name:</p>
            <p>Maria Nadine Faye Rufo</p> {/* full Name from DB */}
          </div>
          <div className='summary-item'>
            <p>Items:</p>
            <p>{totalItems()}</p>
          </div>
          <div className='summary-item'>
            <p>Pickup Date:</p>
            <p>September 12, 2025</p> {/* date from DB */}
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

          {products.length > 0 && (
            <button onClick={() => setIsModalOpen(true)}>Checkout</button>
          )}
        </div>

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
