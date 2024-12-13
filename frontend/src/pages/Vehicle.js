import React, { useState } from 'react';
import axios from 'axios';
import '../style2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [year, setYear] = useState('');
  const [vehIdentityNumber, setVehIdentityNumber] = useState('');
  const [licenPlateNumber, setLicenPlateNumber] = useState('');
  const [engineNumber, setEngineNumber] = useState('');

  const handleReset = () => {
    setVehicleMake('');
    setVehicleModel('');
    setYear('');
    setVehIdentityNumber('');
    setLicenPlateNumber('');
    setEngineNumber('');
  };

  const validateForm = () => {
    // Validate vehicle make (letters only)
    const vehicleMakeRegex = /^[A-Za-z]+$/;
    if (!vehicleMakeRegex.test(vehicleMake)) {
      alert('Vehicle Make should only contain letters.');
      return false;
    }

    // Validate year (4 digits, <= 2024)
    const yearRegex = /^(19|20)\d{2}$/;
    if (!yearRegex.test(year) || parseInt(year, 10) > 2024) {
      alert('Year must be a 4-digit number and should not exceed 2024.');
      return false;
    }

    // Validate vehicle identity number (2-3 letters, space or dash, 4 digits)
    const vehIdentityNumberRegex = /^[A-Za-z]{2,3}[\s-]?\d{4}$/;
    if (!vehIdentityNumberRegex.test(vehIdentityNumber)) {
      alert('Vehicle Identity Number must have 2-3 letters, a space or dash, followed by 4 digits.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const vehicleData = {
      vehicleMake,
      vehicleModel,
      year,
      vehIdentityNumber,
      licenPlateNumber,
      engineNumber,
    };

    try {
      await axios.post('http://localhost:8070/vehicle/create', vehicleData);
      alert('Vehicle added successfully!');
      handleReset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Error adding vehicle: ' + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Manage your <span>Vehicles</span> with ease!
            </h2>
            <p>
              Add new vehicles to <span>ES CUSTOMS</span> now!
            </p>

            <button className="cta" onClick={() => navigate('/SearchVehicle') }>
              <span className="hover-underline-animation"> View Register Vehicle </span>
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
            Register Your <span>Vehicle</span>
          </h1>
          <p>
            Welcome to <span>ES CUSTOMS</span>. Innovate, Repair, Modify.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="vehicleMake"
                required
                value={vehicleMake}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z]*$/.test(value)) { // Only allow letters
                    setVehicleMake(value);
                  }
                }}
              />
              <label className={vehicleMake ? 'shrink' : ''}>Vehicle Brand</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="vehicleModel"
                required
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
              <label className={vehicleModel ? 'shrink' : ''}>Vehicle Model</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <label className={year ? 'shrink' : ''}>Year</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="vehIdentityNumber"
                required
                value={vehIdentityNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z]{0,3}[\s-]?\d{0,4}$/.test(value)) { // Validate as the user types
                    setVehIdentityNumber(value);
                  }
                }}
              />
              <label className={vehIdentityNumber ? 'shrink' : ''}>Vehicle Identity Number</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="licenPlateNumber"
                required
                value={licenPlateNumber}
                onChange={(e) => setLicenPlateNumber(e.target.value)}
              />
              <label className={licenPlateNumber ? 'shrink' : ''}>License Card Number</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="engineNumber"
                required
                value={engineNumber}
                onChange={(e) => setEngineNumber(e.target.value)}
              />
              <label className={engineNumber ? 'shrink' : ''}>Engine Number</label>
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

export default AddVehicle;
