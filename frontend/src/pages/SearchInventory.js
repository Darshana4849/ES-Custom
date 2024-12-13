import React, { useState } from 'react';
import axios from 'axios';
import '../css/style21.css'; // Your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchInventory = () => {
  const [itemCode, setItemCode] = useState(''); // For storing input
  const [inventoryItem, setInventoryItem] = useState(null); // Store inventory item data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [updatedInventoryItem, setUpdatedInventoryItem] = useState({}); // For storing updated inventory item data

  const handleSearch = () => {
    if (!itemCode.trim()) return; // Avoid empty search
    setLoading(true);
    setError(null);

    // Fetch inventory item details using item code
    axios.get(`http://localhost:8070/inventory/get/${itemCode}`)
      .then(response => {
        setInventoryItem(response.data.inventoryItem); // Set inventory item details
        setUpdatedInventoryItem(response.data.inventoryItem); // Initialize updatedInventoryItem with fetched item details
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching inventory item details:", error);
        setError('Inventory item not found or server error');
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    if (!inventoryItem) return; // Ensure inventory item exists before updating
    axios.put(`http://localhost:8070/inventory/update/${inventoryItem._id}`, updatedInventoryItem)
      .then(response => {
        setInventoryItem(updatedInventoryItem); // Update inventory item state with new data
        setIsEditing(false); // Exit editing mode
        alert('Inventory item updated successfully!'); // Alert for successful update
      })
      .catch(error => {
        console.error("Error updating inventory item:", error);
        setError('Failed to update inventory item');
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
      <div className="inventory-profile-container dark-background">
        <h1 className="inventory-profile-header">Search Inventory by Item Code</h1>

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

        {loading && <p>Loading inventory item details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display inventory item details if found */}
        {inventoryItem && (
          <div className="inventory-profile-content">
            <h2>Inventory Item Details</h2>
            <div className="inventory-profile-details">
              <p>
                <strong>Item Code:</strong> {inventoryItem.itemCode}
              </p>
              <p>
                <strong>Item Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedInventoryItem.itemName}
                    onChange={(e) => setUpdatedInventoryItem({ ...updatedInventoryItem, itemName: e.target.value })}
                  />
                ) : (
                  ` ${inventoryItem.itemName}`
                )}
              </p>
              <p>
                <strong>Price:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    value={updatedInventoryItem.price}
                    onChange={(e) => setUpdatedInventoryItem({ ...updatedInventoryItem, price: e.target.value })}
                  />
                ) : (
                  ` ${inventoryItem.price}`
                )}
              </p>
              <p>
                <strong>Quantity:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    value={updatedInventoryItem.quantity}
                    onChange={(e) => setUpdatedInventoryItem({ ...updatedInventoryItem, quantity: e.target.value })}
                  />
                ) : (
                  ` ${inventoryItem.quantity}`
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

export default SearchInventory;
