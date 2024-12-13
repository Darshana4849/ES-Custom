const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    
    fullName: {
        type: String,
        required: true
    },
    nationalID: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Define possible gender options
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Validates that the contact number is exactly 10 digits
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Basic email validation
    },
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    jobRole: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true,
        min: 0 // Ensures experience can't be negative
    },
    specializedSkills: {
        type: [String], // Array of skills as strings
        required: true
    },
    bankAccountNumber: {
        type: String,
        required: true,
        unique: true
    },
    salary: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String, // Store the image URL or file path
        required: false // Change this to false if an image is optional
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
