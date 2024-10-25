import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/productspagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';
import SizePopUpChart from './SizePopUpChart';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Male Traditional Polo', price: 560, image: require('../imgs/college/college_malepolo.png'), selectedSize: '', category: 'college', description: 'A traditional male polo for college students.', hasSizes: true, stock: 15 },
    { id: 2, name: 'Male Traditional Pants', price: 700, image: require('../imgs/college/college_malepants.png'), selectedSize: '', category: 'college', description: 'Classic pants for male college students.', hasSizes: true, stock: 5 },
    { id: 3, name: 'Female Traditional Blouse', price: 560, image: require('../imgs/college/college_femaleblouse.png'), selectedSize: '', category: 'college', description: 'A traditional female blouse for college students.', hasSizes: true, stock: 8 },
    { id: 4, name: 'Female Traditional Pants', price: 700, image: require('../imgs/college/college_femalepants.png'), selectedSize: '', category: 'college', description: 'Classic pants for female college students.', hasSizes: true, stock: 0 },
    { id: 5, name: 'Male Psychology Traditional Polo', price: 600, image: require('../imgs/college/college_psychmalepolo.png'), selectedSize: '', category: 'college', description: 'A traditional male polo for psychology students.', hasSizes: true, stock: 10 },
    { id: 6, name: 'Female Nursing Traditional Blouse', price: 600, image: require('../imgs/college/college_nursingfemalepolo.png'), selectedSize: '', category: 'college', description: 'A traditional female blouse for nursing students.', hasSizes: true, stock: 25 },
    { id: 7, name: 'Female SHS Blouse', price: 580, image: require('../imgs/shs/shs_femaleblouse.png'), selectedSize: '', category: 'senior high school', description: 'A traditional female blouse for senior high school students.', hasSizes: true, stock: 12 },
    { id: 8, name: 'Male SHS Polo', price: 580, image: require('../imgs/shs/shs_malepolo.png'), selectedSize: '', category: 'senior high school', description: 'A stylish blouse for male senior high school students.', hasSizes: true, stock: 3 },
    { id: 9, name: 'Bulldogs Cap', price: 199, image: require('../imgs/merch/merch_nucap.png'), selectedSize: '', category: 'merchandise', description: 'A trendy cap for Bulldogs fans.', hasSizes: false, stock: 20 },
    { id: 10, name: 'NU Drawstring Bag', price: 149, image: require('../imgs/merch/merch_drawstring.png'), selectedSize: '', category: 'merchandise', description: 'A convenient drawstring bag for daily use.', hasSizes: false, stock: 10 },
    { id: 11, name: 'Bulldog Stuffed Toy', price: 299, image: require('../imgs/merch/merch_plushie.png'), selectedSize: '', category: 'merchandise', description: 'A cute Bulldog plush toy for school spirit.', hasSizes: false, stock: 0 },
    { id: 12, name: 'NU Tumbler', price: 399, image: require('../imgs/merch/merch_tumbler.png'), selectedSize: '', category: 'merchandise', description: 'A durable tumbler for on-the-go drinks.', hasSizes: false, stock: 25 },
]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartMessage, setCartMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // for modal
  const [totalItemsInCart, setTotalItemsInCart] = useState(0); // track total items in the cart
  const [uniformCount, setUniformCount] = useState(0); // track number of uniforms added to the cart

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // size chart function
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const handleOpenSizeChart = () => {
    setIsSizeChartOpen(true);
  };

  const handleCloseSizeChart = () => {
    setIsSizeChartOpen(false);
  };

  const handleSizeClick = (id, size) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, selectedSize: size } : product
      )
    );
  
    if (selectedProduct) {
      setSelectedProduct(prev => ({ ...prev, selectedSize: size }));
    }
  };
  

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Check if the product is a uniform and enforce limit of 2 uniforms
      const isUniform = selectedProduct.category !== 'merchandise';
      const newUniformCount = isUniform ? uniformCount + 1 : uniformCount;

      if (isUniform && newUniformCount > 2) {
        setCartMessage('You can only add up to 2 uniforms.');
        return;
      }

      // Enforce total item limit of 5
      const newTotalItems = totalItemsInCart + 1;
      if (newTotalItems > 5) {
        setCartMessage('You can only add up to 5 items.');
        return;
      }

      // Add the product to the cart
      setCartMessage('Added to cart!');
      setTotalItemsInCart(newTotalItems);
      setUniformCount(newUniformCount);

      setTimeout(() => {
        setCartMessage('');
      }, 2000);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <NavBar />

      <section className='introduction'>
        <h1>Wear your pride, embrace the blue!</h1>
        <p>Happy shopping! Enjoy exploring our collection and finding the perfect gear to showcase your Bulldog spirit!</p>
        <button className="size-chart-button" onClick={handleOpenSizeChart}>View Size Chart</button>
      </section>

      {isSizeChartOpen && <SizePopUpChart onClose={handleCloseSizeChart} />}

      <section>
        <div className="notice-section">
          <p>
            Please note: Students can only avail up to 2 uniforms per student and a maximum of 5 items per transaction.
          </p>
        </div>
      </section>

      <section className="product-container">
        <h1 className="product-header">Products</h1>

        <div className="category-filter">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <button className={selectedCategory === 'all' ? 'selected' : ''} onClick={() => setSelectedCategory('all')}>All</button>
          <button className={selectedCategory === 'college' ? 'selected' : ''} onClick={() => setSelectedCategory('college')}>College</button>
          <button className={selectedCategory === 'senior high school' ? 'selected' : ''} onClick={() => setSelectedCategory('senior high school')}>Senior High School</button>
          <button className={selectedCategory === 'merchandise' ? 'selected' : ''} onClick={() => setSelectedCategory('merchandise')}>Merchandise</button>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="individual-product" key={product.id}>
                <div className="image-wrapper" onClick={() => handleProductClick(product)}>
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <h2 className="product-name">{product.name}</h2>
                <p className="description-text">{product.description}</p>
                <div className="price-section">
                  <span className="price-label">PHP {product.price}</span>
                  {product.stock === 0 ? (
                    <span className="out-of-stock">Out of stock</span>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>

      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="modal-info">
              <h2 className="product-name">{selectedProduct.name}</h2>
              <p className="description-text">{selectedProduct.description}</p>
              {selectedProduct.hasSizes && (
                <div className="modal-size-selection">
                  <label htmlFor="size">Select Size:</label>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className={`modal-size-option ${selectedProduct.selectedSize === size ? 'modal-size-selected' : ''}`}
                      onClick={() => handleSizeClick(selectedProduct.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
              <div className="modal-price-section">
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#34408e' }}>
                        Price: PHP {selectedProduct.price.toFixed(2)}
                    </span>
              </div>
              <div className="quantity-selection">
                <label htmlFor="quantity">Quantity:</label>
                {selectedProduct.hasSizes ? (
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="2" // limit to 2 if the product has sizes
                    defaultValue="1"
                  />
                ) : (
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max={selectedProduct.stock} // stock-based limit for non-sized products
                    defaultValue="1"
                  />
                )}
              </div>
              <p className='pnote'>Please note: Students can only avail up to 2 uniforms per student 
                and a maximum of 5 items per transaction.</p>
                <div className="button-container">
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock === 0} // Disable if out of stock
                >
                  Add to Cart
                </button>
                <button className="close-modal-button" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}



      {cartMessage && <div className="overlay">{cartMessage}</div>}

      <FeedbackPage />
      <ContactSection />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductsPage;
