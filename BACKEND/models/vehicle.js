const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vehicleSchema = new Schema({ 

    vehicleMake: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    vehIdentityNumber: {
        type: String,
        required: true
    },
    licenPlateNumber: {
        type: String,
        required: true
    },
    engineNumber: {
        type: String,
        required: true
    } 
});

const vehicle = mongoose.model("vehicle", vehicleSchema);
module.exports = vehicle;