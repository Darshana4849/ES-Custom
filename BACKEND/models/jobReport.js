const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for completed jobs
const completedJobSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Validates email format
    },
    vehIdentityNumber: {
        type: String,
        required: true
    },
    typeOfService: {
        type: String,
        required: true
    },
    serDescription: {
        type: String,
        required: true
    },
    technicianName: {
        type: String,
        required: true // Assuming a technician must be assigned
    },
    technicianID: {
        type: String,
        required: true // Assuming a technician ID is required
    },
    completionDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending', 'Cancelled'], // Possible statuses
        default: 'Completed' // Default to completed
    },
    feedback: {
        type: String,
        default: '' // Optional feedback from the client
    },
    serviceCharge: {
        type: Number,
        required: true, // Assuming service charge is required for completed jobs
        min: [0, 'Service charge must be a positive number'] // Ensures service charge is non-negative
    }
});

// Create the CompletedJob model
const CompletedJob = mongoose.model("CompletedJob", completedJobSchema);

module.exports = CompletedJob;
