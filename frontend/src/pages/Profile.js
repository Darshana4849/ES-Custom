import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import for advanced table and formatting
import '../css/style16.css'; // Create a new CSS file for styling the profile

const EmployeeProfile = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // State to toggle editing mode
  const [updatedEmployee, setUpdatedEmployee] = useState({}); // To store the updated fields

  useEffect(() => {
    // Fetch employee details using the ID
    axios.get(`http://localhost:8070/employee/get/${id}`)
      .then(response => {
        setEmployee(response.data.employee);
        setUpdatedEmployee(response.data.employee); // Initialize updatedEmployee with existing data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      });
  }, [id]);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({
      ...updatedEmployee,
      [name]: value
    });
  };

  // Function to handle profile update
  const handleUpdate = () => {
    axios.put(`http://localhost:8070/employee/update/${id}`, updatedEmployee)
      .then(response => {
        alert("Employee details updated successfully!");
        setEmployee(updatedEmployee); // Update the state with new details
        setEditing(false); // Exit editing mode
      })
      .catch(error => {
        console.error("Error updating employee details:", error);
        alert('Failed to update employee details');
      });
  };

  // Function to generate and download the profile as a modern PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add a header with company title and logo
    doc.setFontSize(22);
    doc.text('ES Customs Employee Profile', 105, 20, null, null, 'center');

    // Add employee's profile picture if available
    if (employee && employee.imageUrl) {
      doc.addImage(`http://localhost:8070/uploads/${employee.imageUrl}`, 'JPEG', 160, 30, 40, 40);
    }

    doc.setFontSize(16);
    doc.text(employee.fullName, 20, 40); // Employee's name as profile header
    doc.setFontSize(12);
    doc.text(`Employee ID: ${employee.employeeID}`, 20, 50);

    // Sectioned information layout
    const profileDetails = [
      ['National ID', employee.nationalID],
      ['Contact Number', employee.contactNumber],
      ['Email', employee.emailAddress],
      ['Job Role', employee.jobRole],
      ['Address', employee.address],
      ['Date of Birth', employee.dateOfBirth],
      ['Years of Experience', employee.yearsOfExperience],
      ['Bank Account Number', employee.bankAccountNumber],
      ['Salary', `LKR. ${employee.salary}`],
    ];

    // Add profile details as a modern table with autoTable
    doc.autoTable({
      startY: 60,
      head: [['Field', 'Details']],
      body: profileDetails,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }, // Custom color
      styles: { fontSize: 11 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 130 }
      }
    });

    // Footer
    doc.setFontSize(10);
    doc.text('Generated by ES Customs System', 105, doc.internal.pageSize.height - 10, null, null, 'center');

    // Save the generated PDF
    doc.save(`${employee.fullName}-profile.pdf`);
  };

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (!employee) {
    return <p>No employee found!</p>;
  }

  return (
    <div className="profile-container dark-background">
      <h1 className="profile-header">{employee.fullName}</h1> {/* Display employee's name as the header */}
      <div className="profile-content">
        <img 
          src={`http://localhost:8070/uploads/${employee.imageUrl}`} 
          alt={employee.fullName} 
          className="profile-image"
        />
        <div className="profile-details">
          <p><strong>Employee ID:</strong> {editing ? <input type="text" name="employeeID" value={updatedEmployee.employeeID} onChange={handleChange} /> : employee.employeeID}</p>
          <p><strong>National ID:</strong> {editing ? <input type="text" name="nationalID" value={updatedEmployee.nationalID} onChange={handleChange} /> : employee.nationalID}</p>
          <p><strong>Contact Number:</strong> {editing ? <input type="text" name="contactNumber" value={updatedEmployee.contactNumber} onChange={handleChange} /> : employee.contactNumber}</p>
          <p><strong>Email:</strong> {editing ? <input type="email" name="emailAddress" value={updatedEmployee.emailAddress} onChange={handleChange} /> : employee.emailAddress}</p>
          <p><strong>Job Role:</strong> {editing ? <input type="text" name="jobRole" value={updatedEmployee.jobRole} onChange={handleChange} /> : employee.jobRole}</p>
          <p><strong>Address:</strong> {editing ? <input type="text" name="address" value={updatedEmployee.address} onChange={handleChange} /> : employee.address}</p>
          <p><strong>Date of Birth:</strong> {editing ? <input type="date" name="dateOfBirth" value={updatedEmployee.dateOfBirth} onChange={handleChange} /> : employee.dateOfBirth}</p>
          <p><strong>Years of Experience:</strong> {editing ? <input type="number" name="yearsOfExperience" value={updatedEmployee.yearsOfExperience} onChange={handleChange} /> : employee.yearsOfExperience}</p>
          <p><strong>Bank Account Number:</strong> {editing ? <input type="text" name="bankAccountNumber" value={updatedEmployee.bankAccountNumber} onChange={handleChange} /> : employee.bankAccountNumber}</p>
          <p><strong>Salary:</strong> {editing ? <input type="text" name="salary" value={updatedEmployee.salary} onChange={handleChange} /> : `LKR. ${employee.salary}`}</p>
        </div>
      </div>

      {/* Button to download profile as PDF */}
      <button className="Btn" onClick={downloadPDF}>
        <svg
          className="svgIcon"
          viewBox="0 0 384 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          ></path>
        </svg>
        <span className="icon2"></span>
        <span className="tooltip">Download Profile</span>
      </button>

      {/* Button container for editing actions */}
      <div>
        <button id="btn-message" className="button-message" onClick={() => setEditing(!editing)}>
          <div className="content-avatar">
            <div className="status-user"></div>
            <div className="avatar">
              <svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path>
              </svg>
            </div>
          </div>
          <div className="notice-content">
            <div className="username">{employee.fullName}</div>
            <div className="user-id">@{employee.employeeID}</div>
          </div>
        </button>

        {editing && (
        <button class="save-button" onClick={handleUpdate}>
        <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Save Changes </span>
        </span>
       </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
