import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/style12.css';

const CatalogueCard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch inventory items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8070/inventory'); // Fetch from backend API
        setItems(response.data); // Assuming the response contains the array of inventory items
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch items. Try again later.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // The empty array ensures this runs only once when the component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleOrderNow = (item) => {
    navigate('/order', { state: { itemName: item.itemName, itemCode: item.itemCode, price: item.price } });
  };
  

  return (
    <div>
      <Header />
      <div className="catalogue-container">
        <h1>OUR <span>CATALOGUE</span></h1>
        <div className="catalogue-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="catalogue-card">
                <div className="catalogue-image">
                  <img src={`http://localhost:8070/uploads/${item.imageUrl}`} alt={item.itemName} />
                </div>
                <div className="catalogue-info">
                  <h2>{item.itemName}</h2>
                  <p>Item Code: {item.itemCode}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>LKR. {item.price}</p>
                  <div className="form-buttons">
                  <button type="submit" className="submit-btn" onClick={() => handleOrderNow(item)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    get now
                  </button>

            </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items available in the catalogue.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogueCard;