import React, { useState } from 'react';
import './components_css/productspagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 450, image: 'path/to/your/image1.jpg', selectedSize: '', category: 'college', description: 'Description for Product 1', hasSizes: true },
    { id: 2, name: 'Product 2', price: 500, image: 'path/to/your/image2.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 2', hasSizes: true },
    { id: 3, name: 'Product 3', price: 600, image: 'path/to/your/image3.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 3', hasSizes: false },
    { id: 4, name: 'Product 4', price: 700, image: 'path/to/your/image4.jpg', selectedSize: '', category: 'college', description: 'Description for Product 4', hasSizes: true },
    { id: 5, name: 'Product 5', price: 800, image: 'path/to/your/image5.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 5', hasSizes: true },
    { id: 6, name: 'Product 6', price: 850, image: 'path/to/your/image6.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 6', hasSizes: false },
    { id: 7, name: 'Product 7', price: 900, image: 'path/to/your/image7.jpg', selectedSize: '', category: 'college', description: 'Description for Product 7', hasSizes: true },
    { id: 8, name: 'Product 8', price: 950, image: 'path/to/your/image8.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 8', hasSizes: true },
    { id: 9, name: 'Product 9', price: 1000, image: 'path/to/your/image9.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 9', hasSizes: false },
    { id: 10, name: 'Product 10', price: 1050, image: 'path/to/your/image10.jpg', selectedSize: '', category: 'college', description: 'Description for Product 10', hasSizes: true },
    { id: 11, name: 'Product 11', price: 1100, image: 'path/to/your/image11.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 11', hasSizes: true },
    { id: 12, name: 'Product 12', price: 1150, image: 'path/to/your/image12.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 12', hasSizes: false },
    { id: 13, name: 'Product 13', price: 1200, image: 'path/to/your/image13.jpg', selectedSize: '', category: 'college', description: 'Description for Product 13', hasSizes: true },
    { id: 14, name: 'Product 14', price: 1250, image: 'path/to/your/image14.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 14', hasSizes: true },
    { id: 15, name: 'Product 15', price: 1300, image: 'path/to/your/image15.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 15', hasSizes: false },
    { id: 16, name: 'Product 16', price: 1350, image: 'path/to/your/image16.jpg', selectedSize: '', category: 'college', description: 'Description for Product 16', hasSizes: true },
    { id: 17, name: 'Product 17', price: 1400, image: 'path/to/your/image17.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 17', hasSizes: true },
    { id: 18, name: 'Product 18', price: 1450, image: 'path/to/your/image18.jpg', selectedSize: '', category: 'merchandise', description: 'Description for Product 18', hasSizes: false },
    { id: 19, name: 'Product 19', price: 1500, image: 'path/to/your/image19.jpg', selectedSize: '', category: 'college', description: 'Description for Product 19', hasSizes: true },
    { id: 20, name: 'Product 20', price: 1550, image: 'path/to/your/image20.jpg', selectedSize: '', category: 'senior high school', description: 'Description for Product 20', hasSizes: true },
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleSizeClick = (id, size) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selectedSize: size } : product
      )
    );
  };

  return (
    <div>
        <NavBar />
        
        <section className='introduction'>
          <h1>Wear your pride, embrace the blue! papalitan q pa bg d mabasa</h1>
          <p>Happy shopping! Enjoy exploring our collection and finding the perfect gear to showcase your Bulldog spirit!</p>
          <button className="size-chart-button">View Size Chart</button>
        </section>

        <section className='sizetable'>


        </section>


        <section className="product-container">
          <h1 className="product-header">Products</h1>
          <div className="category-filter">
            <button 
                className={selectedCategory === 'all' ? 'selected' : ''} 
                onClick={() => setSelectedCategory('all')}
            >All</button>

            <button 
                className={selectedCategory === 'college' ? 'selected' : ''} 
                onClick={() => setSelectedCategory('college')}
            >College</button>

            <button 
                className={selectedCategory === 'senior high school' ? 'selected' : ''} 
                onClick={() => setSelectedCategory('senior high school')}
            >Senior High School</button>

            <button 
                className={selectedCategory === 'merchandise' ? 'selected' : ''} 
                onClick={() => setSelectedCategory('merchandise')}
            >Merchandise</button>
            
        </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="individual-product" key={product.id}>
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <h2 className="product-name">{product.name}</h2>
                {product.hasSizes && (
                  <div className="size-selection">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className={`size-option ${product.selectedSize === size ? 'size-selected' : ''}`}
                        onClick={() => handleSizeClick(product.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
                <p className="description-text">{product.description}</p>
                <div className="price-section">
                  <span className="price-label">PHP {product.price}</span>
                  <i className="fas fa-cart-plus shopping-icon"></i>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <ContactSection />
        <FeedbackPage />
        <ScrollToTopButton />
    </div>
  );
}

export default ProductsPage;
