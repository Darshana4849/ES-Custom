import React, { useState, useEffect } from 'react';
import '../css/style10.css'; // Importing CSS for the vehicle management table
import axios from 'axios';
import SlideBar from '../components/Slidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing autoTable for table generation
import logo from '../ES lo.png'; // Import your logo image here

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch vehicles from the backend
  useEffect(() => {
    axios.get('http://localhost:8070/vehicle/')
      .then((response) => {
        setVehicles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  }, []);

  // Handle delete request
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/vehicle/delete/${id}`)
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle._id !== id)); 
      })
      .catch((error) => {
        console.error(`Error deleting vehicle with id ${id}:`, error);
      });
  };

  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter((vehicle) => 
    vehicle.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vehicle.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vehIdentityNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF of the vehicle table
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);

    // Add logo
    doc.addImage(logo, 'PNG', 14, 20, 20, 20); // Adjust the position and size as needed

    // Add title
    doc.setFontSize(17);
    doc.text('WELCOME TO!', 40, 27);
    doc.setFontSize(24);
    doc.text('ES CUSTOMS PVT(LTD)', 40, 38);
    doc.setFontSize(20);
    doc.text('Vehicle Management Report', 14, 50);

    // Add current date and time
    const date = new Date();
    doc.setFontSize(12);
    doc.text(`Generated on: ${date.toLocaleString()}`, 14, 60);

    // Add contact information (aligned to the right side)
    const contactInfo = `Contact: +94 77 726 0247\nEmail: info@ecustoms39@gmail.com\nAddress: 21 Main Street, Jaela, Sri Lanka`;
    doc.setFontSize(12);
    doc.text(contactInfo, 195, 50, { align: 'right' });

    const tableColumn = ["Vehicle Brand", "Vehicle Model", "Year", "Vehicle Number", "License Plate", "Engine Number"];
    const tableRows = [];

    filteredVehicles.forEach(vehicle => {
      const vehicleData = [
        vehicle.vehicleMake,
        vehicle.vehicleModel,
        vehicle.year,
        vehicle.vehIdentityNumber,
        vehicle.licenPlateNumber,
        vehicle.engineNumber,
      ];
      tableRows.push(vehicleData);
    });

    // Generate colorful table using autoTable
    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', // Theme for colorful table
      headStyles: { fillColor: [71, 201, 255] }, // Table header color
      alternateRowStyles: { fillColor: [239, 239, 239] }, // Alternating row colors
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // Add footer with centered text
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height;
    doc.text('Generated by ES Customs System', 105, pageHeight - 10, { align: 'center' });

    doc.save('Vehicle_Management_Report.pdf');
  };

  if (loading) {
    return <p>Loading vehicles...</p>;
  }

  return (
    <div>
      <SlideBar />
      <div className="vehicle-management">
        <h1>Vehicle <span>Management</span> </h1>

        {/* Search bar */}
        <form className="search">
          <button className="search__button" type="button"></button>
          <input
            type="text"
            className="search__input"
            placeholder="Search Vehicle Make, Model or Vehicle ID"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Vehicle table */}
        <table>
          <thead>
            <tr>
              <th>Vehicle Brand</th>
              <th>Vehicle Model</th>
              <th>Year</th>
              <th>Vehicle Number</th>
              <th>License Plate Number</th>
              <th>Engine Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.vehicleMake}</td>
                <td>{vehicle.vehicleModel}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.vehIdentityNumber}</td>
                <td>{vehicle.licenPlateNumber}</td>
                <td>{vehicle.engineNumber}</td>
                <td>
                  <button onClick={() => handleDelete(vehicle._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PDF Download button */}
        <button onClick={downloadPDF} className="btn-download-pdf">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default VehicleManagement;
