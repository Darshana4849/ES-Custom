const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suplierSchema = new Schema({ 
    itemName: {
        type: String,
        required: true
    },
    itemCode: {
        type: String,
        required: true
    },
    itemFee: {
        type: Number,  // Changed from double to Numbers
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    availableQty: {
        type: Number,  // Changed from int to Number
        required: true
    }
});

const Suplier = mongoose.model("Suplier", suplierSchema);

module.exports = Suplier;