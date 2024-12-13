import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/style5.css";

const Card = ({ name, title, image, link }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate(link); // Navigate to the specified link
  };

  return (
    <div className="card">
      <div className="card-photo" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="card-title">
        {name} <br />
        <span>{title}</span>
      </div>

      <div className="form-buttons">
        <button type="button" className="submit-btn" onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          view
        </button>
      </div>
    </div>
  );
};

export default Card;
