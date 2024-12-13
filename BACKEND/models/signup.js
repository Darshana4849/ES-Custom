// signup module

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // Removed reTypepassword since it should not be stored
});

const Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;

