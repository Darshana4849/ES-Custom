import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';  // Import Link from react-scroll

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <img src="assets/images/ES CUSTOMS LOGO.png" alt="" width="60px" height="60px" />
      <Link to="/" className="logo"><span>ES</span> CUSTOMS</Link>

      <nav className="navbar">
        {/* <Link to="/">Home</Link> */}

        {location.pathname === '/' ? (
          <>
            <ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink>
            <ScrollLink to="service" smooth={true} duration={500}>Service</ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
            <ScrollLink to="price" smooth={true} duration={500}>Packages</ScrollLink>
            <ScrollLink to="review" smooth={true} duration={500}>Review</ScrollLink>
            <ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink>
          </>
        ) : (
          <>
            <Link to="/#home">Home</Link>
            <Link to="/#service">Service</Link>
            <Link to="/#about">About</Link>
            <Link to="/#price">Packages</Link>
            <Link to="/#review">Review</Link>
            <Link to="/#gallery">Gallery</Link>
          </>
        )}
      
        <Link to="/job">Apply for a job</Link>
        <Link to="/catalogue">Catalogue</Link> 
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <div id="menu-bars" className="fas fa-bars"></div>
    </header>
  );
}

export default Header;
