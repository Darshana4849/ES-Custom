import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaUser, FaUsers, FaCar, FaTasks, FaShoppingCart, FaBoxOpen, FaTruck, FaMoneyBill, FaSignOutAlt } from 'react-icons/fa'; // Import necessary icons
import '../css/style3.css';

const SlideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo"><span>ES</span> CUSTOMS</div>
      <div className="dashboard">
        <Link to="/Dashboard" className="dashboard-button">
          Dashboard
        </Link>
      </div>

      <ul>
        <li><Link to="/UserManagement"><FaUser /> User Management</Link></li>
        <li><Link to="/EmployeeManagement"><FaUsers /> Employee Management</Link></li>
        <li><Link to="/VehicleManagement"><FaCar /> Vehicle Management</Link></li>
        <li><Link to="/JobManagement"><FaTasks /> Job Management</Link></li>
        <li><Link to="/OrderManagement"><FaShoppingCart /> Order Management</Link></li>
        <li><Link to="/InventoryManagement"><FaBoxOpen /> Inventory Management</Link></li>
        <li><Link to="/SupplierManagement"><FaTruck /> Supplier Management</Link></li>
        <li><Link to="/AccountManagement"><FaMoneyBill /> Account Management</Link></li>
        <li><Link to="/"><FaSignOutAlt /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default SlideBar;
