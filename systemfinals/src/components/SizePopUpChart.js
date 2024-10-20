import React, { useState } from 'react';
import './components_css/sizepopupchartstyle.css'; 

const SizePopUpChart = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`size-popup-overlay ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="size-popup-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>SIZE CHART</h2>
        <p>Here is a short description of the sizes.</p>
        <table className="size-chart-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (cm)</th>
              <th>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>34-36</td>
              <td>27</td>
            </tr>
            <tr>
              <td>M</td>
              <td>38-40</td>
              <td>28</td>
            </tr>
            <tr>
              <td>L</td>
              <td>42-44</td>
              <td>29</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>46-48</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizePopUpChart;
