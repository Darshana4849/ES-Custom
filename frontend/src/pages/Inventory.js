import React, { useState } from 'react';
import axios from 'axios';
import '../style2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddInventory = () => {
  const navigate = useNavigate();
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null); // New state for the image file
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setItemCode('');
    setItemName('');
    setPrice('');
    setQuantity('');
    setImage(null); // Reset image
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!itemCode) {
      newErrors.itemCode = 'Item code is required';
    }

    if (!itemName || !/^[A-Za-z\s]+$/.test(itemName)) {
      newErrors.itemName = 'Item name must contain only letters';
    }

    if (!price || price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!quantity || quantity <= 0 || !/^\d+$/.test(quantity)) {
      newErrors.quantity = 'Quantity must be a positive integer';
    }

    if (!image) {
      newErrors.image = 'Please select an image';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const formData = new FormData();
    formData.append('itemCode', itemCode);
    formData.append('itemName', itemName);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', image); // Append the image file to the form data
  
    try {
      await axios.post('http://localhost:8070/inventory/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct headers for file upload
        },
      });
      alert('Inventory item added successfully!');
      handleReset();
    } catch (error) {
      console.error('Error adding inventory item:', error.response ? error.response.data : error.message);
      alert('Error adding inventory item: ' + (error.response ? error.response.data : error.message));
  
      // Optional: Check if the error is related to the itemCode and display a specific message
      if (error.response && error.response.data === 'Error: Item code already exists.') {
        setErrors({ itemCode: 'This item code is already in use. Please choose a different code.' });
      }
    }
  };
  

  const handleItemNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only allow letters and spaces
    setItemName(value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) > 0 && /^[0-9]*\.?[0-9]*$/.test(value))) {
      setPrice(value);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) > 0 && /^\d+$/.test(value))) {
      setQuantity(value);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Welcome! Let's add items to the <span>Inventory</span>!
            </h2>
            <p>
              Repair Spare Parts & <span>Modifications</span>
            </p>
            <button className="cta" onClick={() => navigate('/SearchInventory') }>
              <span className="hover-underline-animation"> View Items </span>
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
            Add <span>Inventory</span>
          </h1>

          <form onSubmit={handleSubmit}>
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
                type="number"
                name="price"
                required
                value={price}
                onChange={handlePriceChange}
              />
              <label className={price ? 'shrink' : ''}>Price</label>
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="user-box">
              <input
                type="number"
                name="quantity"
                required
                value={quantity}
                onChange={handleQuantityChange}
              />
              <label className={quantity ? 'shrink' : ''}>Quantity</label>
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>

            <div className="user-box">
              <input
                type="file"
                name="image"
                required
                accept="image/*"
                onChange={handleImageChange}
              />
              <label>Upload Image</label>
              {errors.image && <span className="error-message">{errors.image}</span>}
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

export default AddInventory;