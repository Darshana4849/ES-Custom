import React, { useState } from 'react';
import axios from 'axios';
import '../css/style18.css'; // Your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderProfile = () => {
  const [contact, setContact] = useState(''); // For storing contact number input
  const [order, setOrder] = useState(null); // Store order data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [updatedOrder, setUpdatedOrder] = useState({}); // For storing updated order data

  // Search order by contact number
  const handleSearch = () => {
    if (!contact.trim()) return; // Avoid empty search
    setLoading(true);
    setError(null);

    // Fetch order details using contact number
    axios.get(`http://localhost:8070/order/get/${contact}`)
      .then(response => {
        setOrder(response.data.order); // Set order details
        setUpdatedOrder(response.data.order); // Initialize updatedOrder with the fetched order details
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching order details:", error);
        setError('Order not found or server error');
        setLoading(false);
      });
  };

  // Update order
  const handleUpdate = () => {
    if (!order) return; // Ensure order exists before updating
    axios.put(`http://localhost:8070/order/update/${order._id}`, updatedOrder)
      .then(response => {
        setOrder(updatedOrder); // Update order state with new data
        setIsEditing(false); // Exit editing mode
      })
      .catch(error => {
        console.error("Error updating order:", error);
        setError('Failed to update order');
      });
  };

  // Delete order
  const handleDelete = () => {
    if (!order) return; // Ensure order exists before deleting
    axios.delete(`http://localhost:8070/order/delete/${order._id}`)
      .then(response => {
        setOrder(null); // Clear order state after deletion
        alert('Order deleted successfully');
      })
      .catch(error => {
        console.error("Error deleting order:", error);
        setError('Failed to delete order');
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
      <div className="order-profile-container dark-background">
        <h1 className="order-profile-header">Search Order by Contact Number</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {loading && <p>Loading order details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display order details if found */}
        {order && (
          <div className="order-profile-content">
            <h2>Order Details</h2>
            <div className="order-profile-details">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Item Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedOrder.item_name}
                    onChange={(e) => setUpdatedOrder({ ...updatedOrder, item_name: e.target.value })}
                  />
                ) : (
                  ` ${order.item_name}`
                )}
              </p>
              <p>
                <strong>Item Code:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedOrder.item_code}
                    onChange={(e) => setUpdatedOrder({ ...updatedOrder, item_code: e.target.value })}
                  />
                ) : (
                  ` ${order.item_code}`
                )}
              </p>
              <p>
                <strong>Count:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    value={updatedOrder.count}
                    onChange={(e) => setUpdatedOrder({ ...updatedOrder, count: e.target.value })}
                  />
                ) : (
                  ` ${order.count}`
                )}
              </p>
              <p>
                <strong>Price:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedOrder.price}
                    onChange={(e) => setUpdatedOrder({ ...updatedOrder, price: e.target.value })}
                  />
                ) : (
                  ` ${order.price}`
                )}
              </p>
              <p>
                <strong>Contact Number:</strong> {order.contact}
              </p>
              <p>
                <strong>Address:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedOrder.address}
                    onChange={(e) => setUpdatedOrder({ ...updatedOrder, address: e.target.value })}
                  />
                ) : (
                  ` ${order.address}`
                )}
              </p>
            </div>

            {/* Update, Delete, and Done buttons */}
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="update-button">Update</button>
                <button onClick={handleDone} className="cancel-button">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="edit-button">Update</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderProfile;
