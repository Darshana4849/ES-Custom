import React, { useState, useEffect } from 'react';
import '../css/style9.css'; // Importing CSS for the signup details table
import axios from 'axios';
import SlideBar from '../components/Slidebar';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing autoTable for table generation
import logo from '../ES lo.png'; // Import your logo image here

const SignupDetails = () => {
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch signup details from the backend
  useEffect(() => {
    axios.get('http://localhost:8070/signup/')
      .then((response) => {
        setSignups(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching signup details:", error);
        setLoading(false);
      });
  }, []);

  // Handle delete request
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/signup/delete/${id}`)
      .then(() => {
        setSignups(signups.filter(signup => signup._id !== id)); 
      })
      .catch((error) => {
        console.error(`Error deleting signup with id ${id}:`, error);
      });
  };

  // Filter signups based on search input
  const filteredSignups = signups.filter((signup) => 
    signup.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    signup.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF of the signup table
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
    doc.text('User Management Report', 14, 50);

    // Add current date and time
    const date = new Date();
    doc.setFontSize(12);
    doc.text(`Generated on: ${date.toLocaleString()}`, 14, 60); // Format the date and time

    // Add contact information (aligned to the right side)
    const contactInfo = `Contact: +94 77 726 0247\nEmail: info@ecustoms39@gmail.com\nAddress: 21 Main Street, Jaela, Sri Lanka`;
    doc.setFontSize(12);
    doc.text(contactInfo, 195, 50, { align: 'right' });

    const tableColumn = ["Username", "Email", "Phone Number"];
    const tableRows = [];

    filteredSignups.forEach(signup => {
      const signupData = [
        signup.username,
        signup.email,
        signup.phoneNumber,
      ];
      tableRows.push(signupData);
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

    doc.save('User_Management_Report.pdf');
  };

  if (loading) {
    return <p>Loading signup details...</p>;
  }

  return (
    <div>
      <SlideBar />
      <div className="signup-details">
        <h1>User <span>Management</span></h1>

        {/* Search bar */}
        <form className="search">
          <button className="search__button" type="button"></button>
          <input 
            type="text" 
            className="search__input" 
            placeholder="Search Username or Email" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </form>

        {/* Signup details table */}
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSignups.map((signup) => (
              <tr key={signup._id}>
                <td>{signup.username}</td>
                <td>{signup.email}</td>
                <td>{signup.phoneNumber}</td>
                <td>{signup.password}</td> {/* Consider hiding passwords in production */}
                <td>
                  <button onClick={() => handleDelete(signup._id)} className="btn-delete">Delete</button>
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

export default SignupDetails;
