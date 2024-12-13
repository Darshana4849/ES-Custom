import React, { useState } from 'react';
import axios from 'axios';
import '../css/style20.css'; // Your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchSuplier = () => {
  const [itemCode, setItemCode] = useState(''); // For storing input
  const [suplier, setSuplier] = useState(null); // Store suplier data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [updatedSuplier, setUpdatedSuplier] = useState({}); // For storing updated suplier data

  const handleSearch = () => {
    if (!itemCode.trim()) return; // Avoid empty search
    setLoading(true);
    setError(null);

    // Fetch suplier details using item code
    axios.get(`http://localhost:8070/suplier/get/${itemCode}`)
      .then(response => {
        setSuplier(response.data.suplier); // Set suplier details
        setUpdatedSuplier(response.data.suplier); // Initialize updatedSuplier with the fetched suplier details
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching suplier details:", error);
        setError('Suplier not found or server error');
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    if (!suplier) return; // Ensure suplier exists before updating
    axios.put(`http://localhost:8070/suplier/update/${suplier._id}`, updatedSuplier)
      .then(response => {
        setSuplier(updatedSuplier); // Update suplier state with new data
        setIsEditing(false); // Exit editing mode
        alert('Suplier details updated successfully!'); // Alert for successful update
      })
      .catch(error => {
        console.error("Error updating suplier:", error);
        setError('Failed to update suplier');
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
      <div className="suplier-profile-container dark-background">
        <h1 className="suplier-profile-header">Search Supplier by Item Code</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Item Code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {loading && <p>Loading suplier details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display suplier details if found */}
        {suplier && (
          <div className="suplier-profile-content">
            <h2>Suplier Details</h2>
            <div className="suplier-profile-details">
              <p>
                <strong>Suplier ID:</strong> {suplier._id}
              </p>
              <p>
                <strong>Item Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedSuplier.itemName}
                    onChange={(e) => setUpdatedSuplier({ ...updatedSuplier, itemName: e.target.value })}
                  />
                ) : (
                  ` ${suplier.itemName}`
                )}
              </p>
              <p>
                <strong>Item Code:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedSuplier.itemCode}
                    onChange={(e) => setUpdatedSuplier({ ...updatedSuplier, itemCode: e.target.value })}
                  />
                ) : (
                  ` ${suplier.itemCode}`
                )}
              </p>
              <p>
                <strong>Item Fee:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    value={updatedSuplier.itemFee}
                    onChange={(e) => setUpdatedSuplier({ ...updatedSuplier, itemFee: e.target.value })}
                  />
                ) : (
                  ` ${suplier.itemFee}`
                )}
              </p>
              <p>
                <strong>Item Description:</strong>
                {isEditing ? (
                  <textarea
                    value={updatedSuplier.itemDescription}
                    onChange={(e) => setUpdatedSuplier({ ...updatedSuplier, itemDescription: e.target.value })}
                  />
                ) : (
                  ` ${suplier.itemDescription}`
                )}
              </p>
              <p>
                <strong>Available Quantity:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    value={updatedSuplier.availableQty}
                    onChange={(e) => setUpdatedSuplier({ ...updatedSuplier, availableQty: e.target.value })}
                  />
                ) : (
                  ` ${suplier.availableQty}`
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

export default SearchSuplier;
