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
import barcodeImage from '../imgs/barcode.png';
import ordersummlogo from '../imgs/websitelogo2.png';

const CartPage = () => {
  const [quantities, setQuantities] = useState([3, 1]);
  const [products, setProducts] = useState([
    { name: 'Bulldogs Cap', price: 199, image: product }, // no size
    { name: 'Female Traditional Blouse (M)', price: 560, image: product1, size: 'M' }, // has size
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = () => quantities.reduce((sum, quantity) => sum + quantity, 0);

 // check if total quantity exceeds the limit
 const isLimitReached = () => totalItems() >= 5;

 const increaseQuantity = (index) => {
   setQuantities(prevQuantities => {
     const newQuantities = [...prevQuantities];
     const product = products[index];

     // check if the total quantity is within the limit of 10
     if (!isLimitReached()) {
       // check if the product has a size and limit to 2, otherwise no limit
       if (product.size) {
         if (newQuantities[index] < 2) {
           newQuantities[index] += 1;
         }
       } else {
         newQuantities[index] += 1;
       }
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

 // delete button function
  const removeProduct = (index) => {
    setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
    setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
  };

  // for footer
  const navigate = useNavigate();
  const setSelectedCategory = (category) => {
    navigate('/products', { state: { selectedCategory: category } });
  };

  // generate pdf function
  const generatePDF = (orderId) => {
    const doc = new jsPDF();

    const margin = 20.0;
    const lineSpacing = 10;

    const img = new Image();
    img.src = ordersummlogo;

    img.onload = function() {
        const logoWidth = img.width / 4;
        const logoHeight = img.height / 4;

        // logo
        const logoXPosition = margin;
        doc.addImage(img, 'PNG', logoXPosition, margin, logoWidth, logoHeight);

        const headerXPosition = doc.internal.pageSize.getWidth() - margin;

        // header
        doc.setFont(undefined, 'bold');
        doc.setTextColor(61, 59, 146);
        doc.setFontSize(20);
        const headerText = 'Bulldogs Exchange';
        const headerTextWidth = doc.getTextWidth(headerText);
        doc.text(headerText, headerXPosition - headerTextWidth, margin + (logoHeight / 2) + 5);

        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        const orderSummaryText = 'Order Summary';
        const orderSummaryTextWidth = doc.getTextWidth(orderSummaryText);
        doc.text(orderSummaryText, headerXPosition - orderSummaryTextWidth, margin + (logoHeight / 2) + 15);

        const lineSpacingAfterTitle = 10;
        doc.line(margin, margin + (logoHeight / 2) + 10 + lineSpacingAfterTitle, 210 - margin, margin + (logoHeight / 2) + 10 + lineSpacingAfterTitle);

        // user info
        let currentYPosition = margin + (logoHeight / 2) + 20 + lineSpacingAfterTitle;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Name: Maria Nadine Faye Rufo`, margin, currentYPosition);
        currentYPosition += lineSpacing;
        doc.text(`Items: ${totalItems()}`, margin, currentYPosition);
        currentYPosition += lineSpacing;
        doc.text(`Pickup Date: September 12, 2025`, margin, currentYPosition);
        
        currentYPosition += lineSpacing;
        doc.line(margin, currentYPosition, 210 - margin, currentYPosition);
        currentYPosition += lineSpacing;

        // products purchased
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Products:', margin, currentYPosition);
        
        currentYPosition += lineSpacing;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        products.forEach((product, index) => {
            const productYPosition = currentYPosition + index * (lineSpacing - 2);
            doc.text(`${index + 1}. ${product.name}`, margin, productYPosition);

            const priceXPosition = 210 - margin;
            doc.text(
                `PHP ${product.price} x ${quantities[index]} = PHP ${quantities[index] * product.price}`,
                priceXPosition,
                productYPosition,
                { align: 'right' }
            );
        });

        const totalYPosition = currentYPosition + products.length * (lineSpacing - 2);
        doc.line(margin, totalYPosition + 5, 210 - margin, totalYPosition + 5);

        const totalPrice = quantities.reduce(
            (sum, quantity, index) => sum + quantity * products[index].price,
            0
        );

        // total price
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Total Price: PHP ${totalPrice}`, 210 - margin, totalYPosition + 10, { align: 'right' });

        // barcode pic
        const pageWidth = doc.internal.pageSize.getWidth();
        const barcodeWidth = pageWidth - 2 * margin;
        const barcodeHeight = (10 / 50) * barcodeWidth;

        currentYPosition = totalYPosition + 20;
        doc.addImage(barcodeImage, 'PNG', margin, currentYPosition, barcodeWidth, barcodeHeight);

        currentYPosition += barcodeHeight + 5;

        const orderIdXPosition = doc.internal.pageSize.getWidth() / 2;
        doc.setFontSize(10);

        // get orderID
        doc.text(`${orderId}`, orderIdXPosition, currentYPosition, { align: 'center' });

        currentYPosition += lineSpacing - 5;

        // footer
        const thankYouMessage =
            'Thank you for your purchase! Please present this along with your school ID to the cashier when you come to pick up your order.';
        const messageXPosition = doc.internal.pageSize.getWidth() / 2;
        const pageHeight = doc.internal.pageSize.getHeight();
        const footerYPosition = pageHeight - 20;

        doc.setFontSize(8);
        doc.text(thankYouMessage, messageXPosition, footerYPosition, {
            align: 'center',
            baseline: 'middle',
        });

        // show orderId sa file name
        const fileName = `Order_${orderId}_Maria_Nadine_Faye_Rufo.pdf`;
        doc.save(fileName);

        setQuantities([]);
        setProducts([]);
    };
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
          // if cart is empty
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

            {/* products list mapping */}
            {products.map((product, index) => (
              <div className='individualproducts' key={index}>
                <div className='productimagename'>
                  <img src={product.image} alt={product.name} />
                  <p cal>{product.name}</p>
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
            <p className='userinfovalue'>Maria Nadine Faye Rufo</p> {/* Full Name from DB */}
          </div>
          <div className='summary-item'>
            <p>Items:</p>
            <p className='userinfovalue'>{totalItems()}</p>
          </div>
          <div className='summary-item'>
            <p>Pickup Date:</p>
            <p className='userinfovalue'>September 12, 2025</p> {/* Date from DB */}
          </div>

          <hr />

          <div className='summary-item'>
            <p>Payment Method:</p>
            <p className='userinfovalue'>Over-the-Counter</p>
          </div>

          <div className='total-price'>
            <p>Total Price:</p>
            <p>PHP {quantities.reduce((sum, quantity, index) => sum + (quantity * products[index].price), 0)}</p>
          </div>

          {products.length > 0 && (
            <button onClick={() => setIsModalOpen(true)}>Checkout</button>
          )}
        </div>

        {/* for pop up window, checkout validation */}
        <ConfirmationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleCheckout}
        />

      </div>

      <FeedbackPage />
      <ContactSection setSelectedCategory={setSelectedCategory} />
      <ScrollToTopButton />
    </div>
  );
};

export default CartPage;
