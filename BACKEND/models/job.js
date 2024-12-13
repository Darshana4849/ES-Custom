const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for jobs
const jobSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Optional: Validates email format
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
    }
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
