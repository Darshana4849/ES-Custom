import React, { useState } from 'react';
import axios from 'axios';
import '../style2.css';
import Header from '../components/Header';
import Footers from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [specializedSkills, setSpecializedSkills] = useState([{ skill: '' }]);
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [salary, setSalary] = useState('');
    const [image, setImage] = useState(null);  // New state for image

    const handleReset = () => {
        setName('');
        setNationalID('');
        setDateOfBirth('');
        setGender('');
        setAddress('');
        setContactNumber('');
        setEmailAddress('');
        setEmployeeID('');
        setJobRole('');
        setDateOfJoining('');
        setYearsOfExperience('');
        setSpecializedSkills([{ skill: '' }]);
        setBankAccountNumber('');
        setSalary('');
        setImage(null);  // Reset image
    };

    // Function to allow only letters in the name field
    const handleNameChange = (e) => {
        const { value } = e.target;
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setName(value);
        }
    };

    const handleJobRoleChange = (e) => {
        const { value } = e.target;
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setJobRole(value);
        }
    };

    // Function to allow only numbers and restrict to 10 digits in the contact number field
    const handleContactNumberChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,10}$/.test(value)) {
            setContactNumber(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', name);
        formData.append('nationalID', nationalID);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        formData.append('emailAddress', emailAddress);
        formData.append('employeeID', employeeID);
        formData.append('jobRole', jobRole);
        formData.append('dateOfJoining', dateOfJoining);
        formData.append('yearsOfExperience', yearsOfExperience);
        formData.append('specializedSkills', specializedSkills.map(s => s.skill).join(','));
        formData.append('bankAccountNumber', bankAccountNumber);
        formData.append('salary', salary);
        if (image) {
            formData.append('image', image);  // Append image
        }

        try {
            const response = await axios.post('http://localhost:8070/employee/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            handleReset();
        } catch (error) {
            console.error('There was an error registering the employee:', error);
            alert('Error registering employee: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleSkillChange = (index, e) => {
        const { name, value } = e.target;
        const newSkills = [...specializedSkills];
        newSkills[index] = { ...newSkills[index], [name]: value };
        setSpecializedSkills(newSkills);
    };

    const handleAddSkill = () => {
        setSpecializedSkills([...specializedSkills, { skill: '' }]);
    };

    const handleRemoveSkill = (index) => {
        const newSkills = specializedSkills.filter((_, i) => i !== index);
        setSpecializedSkills(newSkills);
    };

    const handleInputChange = (setter) => (e) => {
        const { value } = e.target;
        setter(value);
    };

    const handleNumericChange = (setter) => (e) => {
        const { value } = e.target;
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setter(value);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <Header />
            <div className="login-form container">
                <section className="employee-section">
                    <h1>Employee <span>Registration</span></h1>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="user-box">
                            <input
                                type="text"
                                name="name"
                                required
                                value={name}
                                onChange={handleNameChange}
                            />
                            <label className={name ? 'shrink' : ''}>Name</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="nationalID"
                                required
                                value={nationalID}
                                onChange={handleInputChange(setNationalID)}
                            />
                            <label className={nationalID ? 'shrink' : ''}>National ID</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="date"
                                name="dateOfBirth"
                                required
                                value={dateOfBirth}
                                onChange={handleInputChange(setDateOfBirth)}
                            />
                            <label className={dateOfBirth ? 'shrink' : ''}>Date of Birth</label>
                        </div>

                        <div className="gender-box">
                            <label>Gender</label>
                            <div className="gender-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={gender === 'Male'}
                                        onChange={() => setGender('Male')}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={gender === 'Female'}
                                        onChange={() => setGender('Female')}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={gender === 'Other'}
                                        onChange={() => setGender('Other')}
                                    />
                                    Other
                                </label>
                            </div>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="address"
                                required
                                value={address}
                                onChange={handleInputChange(setAddress)}
                            />
                            <label className={address ? 'shrink' : ''}>Address</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="contactNumber"
                                required
                                value={contactNumber}
                                onChange={handleContactNumberChange}
                            />
                            <label className={contactNumber ? 'shrink' : ''}>Contact Number</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="email"
                                name="emailAddress"
                                required
                                value={emailAddress}
                                onChange={handleInputChange(setEmailAddress)}
                            />
                            <label className={emailAddress ? 'shrink' : ''}>Email Address</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="employeeID"
                                required
                                value={employeeID}
                                onChange={handleInputChange(setEmployeeID)}
                            />
                            <label className={employeeID ? 'shrink' : ''}>Employee ID</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="jobRole"
                                required
                                value={jobRole}
                                onChange={handleJobRoleChange}
                            />
                            <label className={jobRole ? 'shrink' : ''}>Job Role</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="date"
                                name="dateOfJoining"
                                required
                                value={dateOfJoining}
                                onChange={handleInputChange(setDateOfJoining)}
                            />
                            <label className={dateOfJoining ? 'shrink' : ''}>Date of Joining</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="number"
                                name="yearsOfExperience"
                                required
                                value={yearsOfExperience}
                                onChange={handleNumericChange(setYearsOfExperience)}
                            />
                            <label className={yearsOfExperience ? 'shrink' : ''}>Years of Experience</label>
                        </div>

                        <div className="specialized-skills">
                            <label>Specialized Skills</label>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Skill</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {specializedSkills.map((skill, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    style={{ backgroundColor: 'black', color: 'white', fontSize: '20px' }}
                                                    type="text"
                                                    name="skill"
                                                    required
                                                    value={skill.skill}
                                                    onChange={(e) => handleSkillChange(index, e)}
                                                />
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => handleRemoveSkill(index)} style={{ backgroundColor: 'black', color: 'white' }}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={handleAddSkill} style={{ backgroundColor: 'black', color: 'white' }}>Add Skill</button>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="bankAccountNumber"
                                required
                                value={bankAccountNumber}
                                onChange={handleNumericChange(setBankAccountNumber)}
                            />
                            <label className={bankAccountNumber ? 'shrink' : ''}>Bank Account Number</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="salary"
                                required
                                value={salary}
                                onChange={handleNumericChange(setSalary)}
                            />
                            <label className={salary ? 'shrink' : ''}>Salary</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label className={image ? 'shrink' : ''}>Profile Image</label>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="submit-button" style={{ backgroundColor: 'black', color: 'white' }}>Submit</button>
                            <button type="button" className="reset-button" onClick={handleReset} style={{ backgroundColor: 'black', color: 'white', marginLeft: '20px' }}>Reset</button>
                            <button type="button" className="view-button" style={{ backgroundColor: 'black', color: 'white', marginLeft: '60%' }} onClick={() => navigate('/EmployeeManagement')}>
                                View Employees
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            <Footers />
        </div>
    );
};

export default Employee;
