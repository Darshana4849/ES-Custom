import React, { useState } from 'react';
import axios from 'axios';
import '../style2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemFee, setItemFee] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setItemName('');
    setItemCode('');
    setItemFee('');
    setItemDescription('');
    setAvailableQty('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!itemName || !/^[A-Za-z\s]+$/.test(itemName)) {
      newErrors.itemName = 'Item name must contain only letters';
    }

    if (!itemCode) newErrors.itemCode = 'Item code is required';
    if (!itemFee || itemFee <= 0) newErrors.itemFee = 'Item fee must be a positive number';
    if (!itemDescription) newErrors.itemDescription = 'Item description is required';
    if (!availableQty || availableQty <= 0) {
      newErrors.availableQty = 'Available quantity must be a positive number';
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

    const supplierData = {
      itemName,
      itemCode,
      itemFee,
      itemDescription,
      availableQty,
    };

    try {
      await axios.post('http://localhost:8070/suplier/create', supplierData);
      alert('Supplier added successfully!');
      handleReset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Error adding supplier: ' + error.message);
    }
  };

  const handleItemNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only allow letters and spaces
    setItemName(value);
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Why settle for ordinary? Let’s make your ride <span>legendary!</span>
            </h2>
            <p>
              Repair Spare Parts & <span>Modifications</span>
            </p>
            <button className="cta" onClick={() => navigate('/SearchSuplier') }>
              <span className="hover-underline-animation"> View Supplier </span>
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
            Add a <span>Supplier</span>
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
                name="itemFee"
                required
                value={itemFee}
                onChange={(e) => setItemFee(e.target.value)}
              />
              <label className={itemFee ? 'shrink' : ''}>Item Fee</label>
              {errors.itemFee && <span className="error-message">{errors.itemFee}</span>}
            </div>

            <div className="user-box">
              <textarea
                name="itemDescription"
                required
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
              <label className={itemDescription ? 'shrink' : ''}>Item Description</label>
              {errors.itemDescription && <span className="error-message">{errors.itemDescription}</span>}
            </div>

            <div className="user-box">
              <input
                type="number"
                name="availableQty"
                required
                value={availableQty}
                onChange={(e) => setAvailableQty(e.target.value)}
              />
              <label className={availableQty ? 'shrink' : ''}>Available Quantity</label>
              {errors.availableQty && <span className="error-message">{errors.availableQty}</span>}
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

export default AddSupplier;
