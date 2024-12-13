import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation
import '../style2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const { itemName: initItemName, itemCode: initItemCode, price: initPrice } = location.state || {};

  // Initialize state with location data or empty values
  const [itemName, setItemName] = useState(initItemName || '');
  const [itemCode, setItemCode] = useState(initItemCode || '');
  const [count, setCount] = useState('');
  const [price, setPrice] = useState(initPrice || '');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setItemName('');
    setItemCode('');
    setCount('');
    setPrice('');
    setContact('');
    setAddress('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate item name (only letters and spaces)
    if (!itemName || !/^[A-Za-z\s]+$/.test(itemName)) {
      newErrors.itemName = 'Item name must contain only letters';
    }

    // Validate item code (should not be empty)
    if (!itemCode) {
      newErrors.itemCode = 'Item code is required';
    }

    // Validate count to ensure it's a positive number
    if (!count || count <= 0) {
      newErrors.count = 'Count must be a positive number';
    }

    // Validate price to ensure it's a positive number
    if (!price || price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Validate contact number (must be exactly 10 digits)
    if (!contact || contact.length !== 10 || !/^\d+$/.test(contact)) {
      newErrors.contact = 'Contact number must be exactly 10 digits';
    }

    if (!address) newErrors.address = 'Address is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderData = {
      item_name: itemName,
      item_code: itemCode,
      count,
      price,
      contact,
      address,
    };

    try {
      await axios.post('http://localhost:8070/order/create', orderData);
      alert('Order added successfully!');
      handleReset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order: ' + error.message);
    }
  };

  const handleItemNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only allow letters and spaces
    setItemName(value);
  };

  const handleCountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) > 0 && /^\d+$/.test(value))) {
      setCount(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) > 0 && /^[0-9]*\.?[0-9]*$/.test(value))) {
      setPrice(value);
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (value.length <= 10) {
      setContact(value);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Hi! We're excited to have you – let's make Your <span>ORDERS!</span>
            </h2>
            <p>
              Repair Spare Parts & <span>Modifications</span>
            </p>

            <button className="cta" onClick={() => navigate('/SearchOrder') }>
              <span className="hover-underline-animation"> View Order </span>
              <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 46 16"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                ></path>
              </svg>
          </button>
            
          </div>
        </section>

        <section className="login-form">
          <h1>
            Hi <span>there!</span>
          </h1>
          <h1>
            Place your <span>Order</span>
          </h1>
          <p>
            Welcome to <span>ES CUSTOMS</span>. Innovate, Repair, Modify.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="itemName"
                required
                value={itemName}
                onChange={handleItemNameChange}
              />
              <label className={itemName ? 'shrink' : ''}>Item Name</label>
              {errors.itemName && <span className="error-message">{errors.itemName}</span>}
            </div>

            <div className="user-box">
              <input
                type="text"
                name="itemCode"
                required
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
              <label className={itemCode ? 'shrink' : ''}>Item Code</label>
              {errors.itemCode && <span className="error-message">{errors.itemCode}</span>}
            </div>

            <div className="user-box">
              <input
                type="number"
                name="count"
                required
                value={count}
                onChange={handleCountChange}
              />
              <label className={count ? 'shrink' : ''}>Item Count</label>
              {errors.count && <span className="error-message">{errors.count}</span>}
            </div>

            <div className="user-box">
              <input
                type="text"
                name="price"
                required
                value={price}
                onChange={handlePriceChange}
              />
              <label className={price ? 'shrink' : ''}>Item Price</label>
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="user-box">
              <input
                type="tel"
                name="contact"
                required
                value={contact}
                onChange={handleContactChange}
              />
              <label className={contact ? 'shrink' : ''}>Contact Number</label>
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="user-box">
              <input
                type="text"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className={address ? 'shrink' : ''}>Delivery Address</label>
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </div>

            <div className="form-buttons">
              <button type="button" className="submit-btn" onClick={handleReset}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AddOrder;
