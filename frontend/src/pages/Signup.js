import React, { useState } from 'react';
import axios from 'axios';
import '../css/style8.css';
import Header from '../components/Header';
import Footers from '../components/Footer';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  };

  // Function to handle phone number input, preventing non-numeric input and limiting to 10 digits
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) { // Allow only digits and limit to 10 digits
      setPhoneNumber(value);
    }
  };

  // Function to handle form submission with validations
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number (must be exactly 10 digits)
    if (phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits!");
      return;
    }

    // Validate password (must be at least 8 characters)
    if (password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    const newUser = {
      username,
      email,
      phoneNumber,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8070/signup/create', newUser);
      alert(response.data); // Display success message
      handleReset(); // Reset form after submission
    } catch (error) {
      console.error('There was an error signing up:', error);
      if (error.response && error.response.data) {
        alert('Error signing up: ' + error.response.data);
      } else {
        alert('Error signing up: ' + error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="signup-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Ready to <span>Transform</span> Your Experience?
            </h2>
            <p>
              Join <span>ES CUSTOMS</span> now!
            </p>
          </div>
        </section>

        <section className="signup-form">
          <h1>
            Create <span>Account</span>
          </h1>
          <p>
            Welcome to <span>ES CUSTOMS</span>. Innovate, Repair, Modify.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={username ? 'shrink' : ''}>Username</label>
            </div>

            <div className="user-box">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={email ? 'shrink' : ''}>Email</label>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="phoneNumber"
                required
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength="10" // This prevents more than 10 digits in the input field
              />
              <label className={phoneNumber ? 'shrink' : ''}>Phone Number</label>
            </div>

            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8" // This ensures a minimum of 8 characters in the input field
              />
              <label className={password ? 'shrink' : ''}>Password</label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Signup
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

export default Signup;
