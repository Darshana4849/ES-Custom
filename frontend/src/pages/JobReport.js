import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footers from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Job = () => {
    const navigate = useNavigate();
    const [clientName, setClientName] = useState('');
    const [email, setEmail] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [serDescription, setSerDescription] = useState('');
    const [technicianName, setTechnicianName] = useState('');
    const [technicianID, setTechnicianID] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [status, setStatus] = useState('');
    const [feedback, setFeedback] = useState('');
    const [serviceCharge, setServiceCharge] = useState('');

    const handleReset = () => {
        setClientName('');
        setEmail('');
        setVehicleId('');
        setTypeOfService('');
        setSerDescription('');
        setTechnicianName('');
        setTechnicianID('');
        setCompletionDate('');
        setStatus('');
        setFeedback('');
        setServiceCharge('');
    };

    const fetchJobDetails = async (vehIdentityNumber) => {
        try {
            const response = await axios.get(`http://localhost:8070/job/get/${vehIdentityNumber}`);
            if (response.data.status === "Job fetched") {
                const { clientName, email, typeOfService } = response.data.job;
                setClientName(clientName);
                setEmail(email);
                setTypeOfService(typeOfService);
            } else {
                alert("Job not found");
                handleReset();
            }
        } catch (error) {
            console.error('Error fetching job details:', error);
            alert('Error fetching job details: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleVehicleIdChange = (e) => {
        const newVehicleId = e.target.value;
        setVehicleId(newVehicleId);
        if (newVehicleId) {
            fetchJobDetails(newVehicleId);
        } else {
            handleReset();
        }
    };

    const handleClientNameChange = (e) => {
        const name = e.target.value;
        // Allow only letters and spaces
        if (/^[a-zA-Z\s]*$/.test(name) || name === '') {
            setClientName(name);
        } else {
            alert('Client name cannot contain numbers.');
        }
    };

    const handleServiceChargeChange = (e) => {
        const charge = e.target.value;
        // Allow only non-negative numbers
        if (charge >= 0 || charge === '') {
            setServiceCharge(charge);
        } else {
            alert('Service charge cannot be negative.');
        }
    };

    const handleCompletionDateChange = (e) => {
        const date = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
        // Allow only dates that are today or in the past
        if (date <= currentDate) {
            setCompletionDate(date);
        } else {
            alert('Completion date cannot be in the future.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields can be added here if needed

        const newJob = {
            clientName,
            email,
            vehIdentityNumber: vehicleId,
            typeOfService,
            serDescription,
            technicianName,
            technicianID,
            completionDate,
            status,
            feedback,
            serviceCharge,
        };

        try {
            const response = await axios.post('http://localhost:8070/jobReport/create', newJob);
            alert(response.data.message);
            handleReset();
        } catch (error) {
            console.error('There was an error creating the job:', error);
            alert('Error creating job: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    return (
        <div>
            <Header />
            <div className="login-form container">
                <section className="job-form">
                    <h1>
                        Hi <span>there!</span>
                    </h1>
                    <h1>
                        Final Job <span>Reports</span>
                    </h1>
                    <p>
                        Welcome to <span>ES CUSTOMS</span>. Innovate, Repair, Modify.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input
                                type="text"
                                name="clientName"
                                required
                                value={clientName}
                                onChange={handleClientNameChange}
                            />
                            <label className={clientName ? 'shrink' : ''}>Client Name</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className={email ? 'shrink' : ''}>Email</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="vehicleId"
                                required
                                value={vehicleId}
                                onChange={handleVehicleIdChange}
                            />
                            <label className={vehicleId ? 'shrink' : ''}>Vehicle Identification Number</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="typeOfService"
                                required
                                value={typeOfService}
                                onChange={(e) => setTypeOfService(e.target.value)}
                            />
                            <label className={typeOfService ? 'shrink' : ''}>Job Type</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="serDescription"
                                required
                                value={serDescription}
                                onChange={(e) => setSerDescription(e.target.value)}
                            />
                            <label className={serDescription ? 'shrink' : ''}>Job Description</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="technicianName"
                                required
                                value={technicianName}
                                onChange={(e) => setTechnicianName(e.target.value)}
                            />
                            <label className={technicianName ? 'shrink' : ''}>Technician Name</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="technicianID"
                                required
                                value={technicianID}
                                onChange={(e) => setTechnicianID(e.target.value)}
                            />
                            <label className={technicianID ? 'shrink' : ''}>Technician ID</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="date"
                                name="completionDate"
                                required
                                value={completionDate}
                                onChange={handleCompletionDateChange}
                            />
                            <label className={completionDate ? 'shrink' : ''}>Completion Date</label>
                        </div>

                        {/* <div className="user-box">
                            <input
                                type="text"
                                name="status"
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label className={status ? 'shrink' : ''}>Status</label>
                        </div> */}

                        <div className="gender-box">
                            <label>Status</label>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="Status"
                                        value="Completed"
                                        checked={status === 'Completed'}
                                        onChange={() => setStatus('Completed')}
                                    />
                                    Completed
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Pending"
                                        checked={status === 'Pending'}
                                        onChange={() => setStatus('Pending')}
                                    />
                                    Pending
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Cancelled"
                                        checked={status === 'Cancelled'}
                                        onChange={() => setStatus('Cancelled')}
                                    />
                                    Cancelled
                                </label>
                            </div>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <label className={feedback ? 'shrink' : ''}>Feedback</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="number"
                                name="serviceCharge"
                                required
                                value={serviceCharge}
                                onChange={handleServiceChargeChange}
                            />
                            <label className={serviceCharge ? 'shrink' : ''}>Service Charge</label>
                        </div>

                        <button type="submit" className="submit-button" style={{ backgroundColor: 'black', color: 'white' }}>Submit</button>
                        <button type="button" className="reset-button" onClick={handleReset} style={{ backgroundColor: 'black', color: 'white', marginLeft: '20px' }}>Reset</button>
                        <button type="button" className="submit-button" style={{ backgroundColor: 'black', color: 'white', marginLeft: '60%'}} onClick={() => navigate('/JobReportManagement' ) }>
                           View Reports
                        </button>
                    </form>
                </section>
            </div>
            <Footers />
        </div>
    );
};

export default Job;
