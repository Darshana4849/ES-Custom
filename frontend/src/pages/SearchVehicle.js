import React, { useState } from 'react';
import axios from 'axios';
import '../css/style19.css'; // Your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchVehicle = () => {
  const [vehIdentityNumber, setVehIdentityNumber] = useState(''); // For storing input
  const [vehicle, setVehicle] = useState(null); // Store vehicle data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [updatedVehicle, setUpdatedVehicle] = useState({}); // For storing updated vehicle data

  const handleSearch = () => {
    if (!vehIdentityNumber.trim()) return; // Avoid empty search
    setLoading(true);
    setError(null);

    // Fetch vehicle details using vehicle identity number
    axios.get(`http://localhost:8070/vehicle/get/${vehIdentityNumber}`)
      .then(response => {
        setVehicle(response.data.vehicle); // Set vehicle details
        setUpdatedVehicle(response.data.vehicle); // Initialize updatedVehicle with fetched vehicle details
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching vehicle details:", error);
        setError('Vehicle not found or server error');
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    if (!vehicle) return; // Ensure vehicle exists before updating
    axios.put(`http://localhost:8070/vehicle/update/${vehicle._id}`, updatedVehicle)
      .then(response => {
        setVehicle(updatedVehicle); // Update vehicle state with new data
        setIsEditing(false); // Exit editing mode
        alert('Vehicle details updated successfully!'); // Alert for successful update
      })
      .catch(error => {
        console.error("Error updating vehicle:", error);
        setError('Failed to update vehicle');
      });
  };

  const handleDone = () => {
    setIsEditing(false); // Exit editing mode
    // Refresh the page
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <div className="vehicle-profile-container dark-background">
        <h1 className="vehicle-profile-header">Search Vehicle by Vehicle ID</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Vehicle Identity Number"
            value={vehIdentityNumber}
            onChange={(e) => setVehIdentityNumber(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {loading && <p>Loading vehicle details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display vehicle details if found */}
        {vehicle && (
          <div className="vehicle-profile-content">
            <h2>Vehicle Details</h2>
            <div className="vehicle-profile-details">
              <p>
                <strong>Vehicle ID:</strong> {vehicle._id}
              </p>
              <p>
                <strong>Vehicle Make:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedVehicle.vehicleMake}
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, vehicleMake: e.target.value })}
                  />
                ) : (
                  ` ${vehicle.vehicleMake}`
                )}
              </p>
              <p>
                <strong>Vehicle Model:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedVehicle.vehicleModel}
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, vehicleModel: e.target.value })}
                  />
                ) : (
                  ` ${vehicle.vehicleModel}`
                )}
              </p>
              <p>
                <strong>Year:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedVehicle.year}
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, year: e.target.value })}
                  />
                ) : (
                  ` ${vehicle.year}`
                )}
              </p>
              <p>
                <strong>Vehicle Identity Number:</strong> {vehicle.vehIdentityNumber}
              </p>
              <p>
                <strong>License Plate Number:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedVehicle.licenPlateNumber}
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, licenPlateNumber: e.target.value })}
                  />
                ) : (
                  ` ${vehicle.licenPlateNumber}`
                )}
              </p>
              <p>
                <strong>Engine Number:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedVehicle.engineNumber}
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, engineNumber: e.target.value })}
                  />
                ) : (
                  ` ${vehicle.engineNumber}`
                )}
              </p>
            </div>

            {/* Update and Done buttons */}
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="update-button">Update</button>
                <button onClick={handleDone} className="cancel-button">Cancel</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchVehicle;
