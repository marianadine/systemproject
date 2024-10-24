import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components_css/productspagestyle.css';

import NavBar from './NavBar';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
import FeedbackPage from './FeedbackPage';
import SizePopUpChart from './SizePopUpChart';

const ProductsPage = () => {

  // default products
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Male Traditional Polo', 
      price: 560, 
      image: require('../imgs/college/college_malepolo.png'),
      selectedSize: '', 
      category: 'college', 
      description: 'A traditional male polo for college students.', 
      hasSizes: true,
      stock: 15,
    },
    { 
      id: 2, 
      name: 'Male Traditional Pants', 
      price: 700, 
      image: require('../imgs/college/college_malepants.png'),
      selectedSize: '', 
      category: 'college', 
      description: 'Classic pants for male college students.', 
      hasSizes: true,
      stock: 5,
    },
    { 
      id: 3, 
      name: 'Female Traditional Blouse', 
      price: 560, 
      image: require('../imgs/college/college_femaleblouse.png'),
      selectedSize: '', 
      category: 'college', 
      description: 'A traditional female blouse for college students.', 
      hasSizes: true,
      stock: 8,
    },
    { 
      id: 4, 
      name: 'Female Traditional Pants', 
      price: 700, 
      image: require('../imgs/college/college_femalepants.png'),
      selectedSize: '', 
      category: 'college', 
      description: 'Classic pants for female college students.', 
      hasSizes: true,
      stock: 0,
    },
    { 
      id: 5, 
      name: 'Female SHS Blouse', 
      price: 580, 
      image: require('../imgs/shs/shs_femaleblouse.png'),
      selectedSize: '', 
      category: 'senior high school', 
      description: 'A traditional female blouse for senior high school students.', 
      hasSizes: true,
      stock: 12,
    },
    { 
      id: 6, 
      name: 'Male SHS Polo', 
      price: 580, 
      image: require('../imgs/shs/shs_malepolo.png'),
      selectedSize: '', 
      category: 'senior high school', 
      description: 'A stylish blouse for male senior high school students.', 
      hasSizes: true,
      stock: 3,
    },
    { 
      id: 7, 
      name: 'Bulldogs Cap', 
      price: 199, 
      image: require('../imgs/merch/merch_nucap.png'),
      selectedSize: '', 
      category: 'merchandise', 
      description: 'A trendy cap for Bulldogs fans.', 
      hasSizes: false,
      stock: 20,
    },
    { 
      id: 8, 
      name: 'NU Drawstring Bag', 
      price: 149, 
      image: require('../imgs/merch/merch_drawstring.png'),
      selectedSize: '', 
      category: 'merchandise', 
      description:  'A convenient drawstring bag for daily use.', 
      hasSizes: false,
      stock: 10,
    },
    { 
      id: 9, 
      name: 'Bulldog Stuffed Toy', 
      price: 299, 
      image: require('../imgs/merch/merch_plushie.png'),
      selectedSize: '', 
      category: 'merchandise', 
      description: 'A cute Bulldog plush toy for school spirit.', 
      hasSizes: false,
      stock: 0,
    },
    { 
      id: 10, 
      name: 'NU Tumbler', 
      price: 399, 
      image: require('../imgs/merch/merch_tumbler.png'),
      selectedSize: '', 
      category: 'merchandise', 
      description: 'A durable tumbler for on-the-go drinks.', 
      hasSizes: false,
      stock: 25,
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  // search and button filter
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // size function
  const handleSizeClick = (id, size) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selectedSize: size } : product
      )
    );
  };

  // size chart function
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const handleOpenSizeChart = () => {
    setIsSizeChartOpen(true);
  };

  const handleCloseSizeChart = () => {
    setIsSizeChartOpen(false);
  };

  // add to cart function
  const handleAddToCart = () => { 
    setCartMessage('Added to cart!');
    setTimeout(() => {
      setCartMessage('');
    }, 2000);
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

      <section className="product-container">
        <h1 className="product-header">Products</h1>
        
        <div className="category-filter">
          {/* search bar filter */}
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

          {/* button filter */}
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

        {/* display all products mapping */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                  {product.stock > 0 ? (
                    <i
                      className="fas fa-cart-plus shopping-icon"
                      onClick={handleAddToCart}
                    ></i>
                  ) : (
                    <span className="out-of-stock">Out of stock</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>

      {cartMessage && <div className="overlay">{cartMessage}</div>}
      
      <ScrollToTopButton />
      <FeedbackPage/>
      <ContactSection setSelectedCategory={setSelectedCategory} />
    </div>
  );
};

export default ProductsPage;
