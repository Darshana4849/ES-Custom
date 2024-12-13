import React, { useState, useEffect } from 'react';
import '../css/style13.css'; // Importing CSS for the inventory management table
import axios from 'axios';
import SlideBar from '../components/Slidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing autoTable for table generation
import logo from '../ES lo.png'; // Import your logo image here
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Fetch inventory items from the backend
  useEffect(() => {
    axios.get('http://localhost:8070/inventory/')
      .then((response) => {
        console.log("Fetched inventory items:", response.data); // Logging to verify the data
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory items:", error);
        setLoading(false);
      });
  }, []);

  // Handle delete request
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/inventory/delete/${id}`)
      .then(() => {
        setInventory(inventory.filter(item => item._id !== id)); 
      })
      .catch((error) => {
        console.error(`Error deleting inventory item with id ${id}:`, error);
      });
  };

  // Filter inventory based on search input
  const filteredInventory = inventory.filter((item) => 
    item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.itemCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF of the inventory table
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
    doc.text('Inventory Management Report', 14, 50);

    // Add current date and time
    const date = new Date();
    doc.setFontSize(12);
    doc.text(`Generated on: ${date.toLocaleString()}`, 14, 60); // Format the date and time

    // Add contact information (aligned to the right side)
    const contactInfo = `Contact: +94 77 726 0247\nEmail: info@ecustoms39@gmail.com\nAddress: 21 Main Street, Jaela, Sri Lanka`;
    doc.setFontSize(12);
    doc.text(contactInfo, 195, 50, { align: 'right' });

    const tableColumn = ["Item Code", "Item Name", "Price", "Quantity"];
    const tableRows = [];

    filteredInventory.forEach(item => {
      const itemData = [
        item.itemCode || 'N/A',
        item.itemName || 'N/A',
        item.price || 'N/A',
        item.quantity || 'N/A',
      ];
      tableRows.push(itemData);
    });

    // Generate colorful table using autoTable
    doc.autoTable({
      startY: 70, // Adjusted position for the table
      head: [tableColumn],
      body: tableRows,
      theme: 'grid', // Theme for colorful table
      headStyles: { fillColor: [71, 201, 255] }, // Table header color
      alternateRowStyles: { fillColor: [239, 239, 239] }, // Alternating row colors
      styles: { fontSize: 10, cellPadding: 3 }, // Style options
    });

    // Add footer with centered text
    doc.setFontSize(10);
    const pageHeight = doc.internal.pageSize.height; // Get page height
    doc.text('Generated by ES Customs System', 105, pageHeight - 10, { align: 'center' }); // Footer content

    doc.save('Inventory_Management_Report.pdf');
  };

  if (loading) {
    return <p>Loading inventory items...</p>;
  }

  return (
    <div>
      <SlideBar />
      <div className="inventory-management">
        <h1>Inventory <span>Management</span></h1>

        {/* Search bar */}
        <form className="search">
          <input 
            type="text" 
            className="search__input" 
            placeholder="Search Item Code or Item Name" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </form>

        {/* Inventory table */}
        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td>{item.itemCode || 'N/A'}</td>
                <td>{item.itemName || 'N/A'}</td>
                <td>{item.price || 'N/A'}</td>
                <td>{item.quantity || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PDF Download button */}
        <button onClick={downloadPDF} className="btn-download-pdf">
          Download PDF
        </button>
        <div className="done-jobs-container">
          <button className="cta" onClick={() => navigate("/Inventory")}>
            <span className="hover-underline-animation">Add Item</span>
            <svg
              id="arrow-horizontal"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 46 16"
              fill="white"
            >
              <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;