import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home component
import Job from './pages/Job'; // Import the Job component
import JobReport from './pages/JobReport';
import Order from './pages/Order'; // Import the Order component
import Package from './pages/Package';  // Import the Package component
import ThemeToggler from './components/Theme'; // Import the ThemeToggler component
import Login from './pages/Login';
import Signup from './pages/Signup'; //Signup page
import Vehicle from './pages/Vehicle';
import Suplier from './pages/Suplier';
import Inventory from './pages/Inventory';
import Catalogue from './pages/Catalogue';
import Employee from './pages/Employee';
import Profile from './pages/Profile';
import SearchJob from './pages/SearchJob';
import SearchOrder from './pages/SearchOrder';
import SearchVehicle from './pages/SearchVehicle';
import SearchSuplier from './pages/SearchSuplier';
import SearchInventory from './pages/SearchInventory';

//admin tables 
import JobManagement from './pages/JobManagement';
import OrderManagement from './pages/OrderManagement';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import VehicleManagement from './pages/VehicleManagement';
import SupplierManagement from './pages/SupplierManagement';
import InventoryManagement from './pages/InventoryManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import JobReportManagement from './pages/JobReportManagement';

import './App.css';

function App() {
  return (
    <Router>
      <ThemeToggler/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<Job />} />
        <Route path='/jobreport' element={<JobReport />} />
        <Route path="/order" element={<Order />} />
        <Route path="/package" element={<Package />} /> {/* Route for Package page */}
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/suplier" element={<Suplier />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/profile/:id" element={<Profile />} />
        <Route path="/searchjob" element={<SearchJob />} />
        <Route path="/searchorder" element={<SearchOrder />} />
        <Route path="/searchvehicle" element={<SearchVehicle />} />
        <Route path="/searchsuplier" element={<SearchSuplier />} />
        <Route path="/searchinventory" element={<SearchInventory />} />

        {/* admin pages */}
        <Route path="/jobmanagement" element={<JobManagement />} />
        <Route path='/jobreportmanagement' element={<JobReportManagement />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/vehiclemanagement" element={<VehicleManagement />} />
        <Route path="/suppliermanagement" element={<SupplierManagement />} />
        <Route path="/inventorymanagement" element={<InventoryManagement />} />
        <Route path="/employeemanagement" element={<EmployeeManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
