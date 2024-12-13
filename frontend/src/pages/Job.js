import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style2.css';
import Header from '../components/Header';
import Footers from '../components/Footer';


const Job = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [vehicleId, setVehicleId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const handleReset = () => {
    setClientName('');
    setEmail(''); // Reset email
    setVehicleId('');
    setServiceType('');
    setServiceDescription('');
  };

  const handleClientNameChange = (e) => {
    const value = e.target.value;
    // Updated regex: allows letters and a space between names
    if (/^[A-Za-z\s]*$/.test(value)) {
      setClientName(value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  const handleVehicleIdChange = (e) => {
    const value = e.target.value;
    // Regex: allows 3 letters, followed by 4 digits, and optionally one space or dash
    if (/^([A-Za-z]{0,3}[-\s]?\d{0,4})?$/.test(value)) {
      setVehicleId(value);
    }
  };

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value);
  };

  const handleServiceDescriptionChange = (e) => {
    setServiceDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      clientName,
      email, // Include email in the new job object
      vehIdentityNumber: vehicleId,
      typeOfService: serviceType,
      serDescription: serviceDescription,
    };

    try {
      const response = await axios.post('http://localhost:8070/job/create', newJob);
      alert(response.data.message); // This will alert the response message
      handleReset(); // Reset form after successful submission
    } catch (error) {
      console.error('There was an error creating the job:', error);
      alert('Error creating job: ' + error.message);
    }
  };

 
  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Life's too short for stock rides – let's make it <span>legendary!</span>
            </h2>
            <p>
              Repare Spare Parts & <span>Modifications</span>
            </p>
            
            <button className="cta" onClick={() => navigate('/SearchJob') }>
              <span className="hover-underline-animation"> View Job </span>
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
            Register for a <span>Service</span>
          </h1>
          <p>
            Welcome to <span>ES CUSTOMS</span>. Innovate, Repair, Modify.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="clientName"
                required
                value={clientName}
                onChange={handleClientNameChange}
              />
              <label className={clientName ? 'shrink' : ''}>Client Name</label>
            </div>

            <div className="user-box">
              <input
                type="email" // Change to type="email" for email validation
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <label className={email ? 'shrink' : ''}>Email</label> {/* New email label */}
            </div>

            <div className="user-box">
              <input
                type="text"
                name="vehicleId"
                required
                value={vehicleId}
                onChange={handleVehicleIdChange}
              />
              <label className={vehicleId ? 'shrink' : ''}>Vehicle Identification Number</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="serviceType"
                required
                value={serviceType}
                onChange={handleServiceTypeChange}
              />
              <label className={serviceType ? 'shrink' : ''}>Type of Service</label>
            </div>

            <div className="user-box">
              <textarea
                name="serviceDescription"
                required
                value={serviceDescription}
                onChange={handleServiceDescriptionChange}
              />
              <label className={serviceDescription ? 'shrink' : ''}>Service Description</label>
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
      <Footers />
    </div>
  );
};

export default Job;
