import React, { useState } from 'react';
import axios from 'axios';
import '../css/style17.css'; // Your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const JobProfile = () => {
  const [vehIdentityNumber, setVehIdentityNumber] = useState(''); // For storing input
  const [job, setJob] = useState(null); // Store job data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [updatedJob, setUpdatedJob] = useState({}); // For storing updated job data

  const handleSearch = () => {
    if (!vehIdentityNumber.trim()) return; // Avoid empty search
    setLoading(true);
    setError(null);

    // Fetch job details using vehicle identity number
    axios.get(`http://localhost:8070/job/get/${vehIdentityNumber}`)
      .then(response => {
        setJob(response.data.job); // Set job details
        setUpdatedJob(response.data.job); // Initialize updatedJob with the fetched job details
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching job details:", error);
        setError('Job not found or server error');
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    if (!job) return; // Ensure job exists before updating
    axios.put(`http://localhost:8070/job/update/${job._id}`, updatedJob)
      .then(response => {
        setJob(updatedJob); // Update job state with new data
        setIsEditing(false); // Exit editing mode
        alert('Job details updated successfully!'); // Alert for successful update
      })
      .catch(error => {
        console.error("Error updating job:", error);
        setError('Failed to update job');
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
      <div className="job-profile-container dark-background">
        <h1 className="job-profile-header">Search Job by Vehicle ID</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Vehicle Identity Number"
            value={vehIdentityNumber}
            onChange={(e) => setVehIdentityNumber(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        {loading && <p>Loading job details...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Display job details if found */}
        {job && (
          <div className="job-profile-content">
            <h2>Job Details</h2>
            <div className="job-profile-details">
              <p>
                <strong>Job ID:</strong> {job._id}
              </p>
              <p>
                <strong>Client Name:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedJob.clientName}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, clientName: e.target.value })}
                  />
                ) : (
                  ` ${job.clientName}`
                )}
              </p>
              <p>
                <strong>Email:</strong>
                {isEditing ? (
                  <input
                    type="email"
                    value={updatedJob.email}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, email: e.target.value })}
                  />
                ) : (
                  ` ${job.email}`
                )}
              </p>
              <p>
                <strong>Vehicle ID Number:</strong> {job.vehIdentityNumber}
              </p>
              <p>
                <strong>Type of Service:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedJob.typeOfService}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, typeOfService: e.target.value })}
                  />
                ) : (
                  ` ${job.typeOfService}`
                )}
              </p>
              <p>
                <strong>Description:</strong>
                {isEditing ? (
                  <textarea
                    value={updatedJob.serDescription}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, serDescription: e.target.value })}
                  />
                ) : (
                  ` ${job.serDescription}`
                )}
              </p>
            </div>

            {/* Update and Done buttons */}
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="update-button">Update</button>
                <button onClick={handleDone} className="cancel-button">Cancel</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobProfile;
