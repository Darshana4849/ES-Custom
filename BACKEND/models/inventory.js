const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
    itemCode: {
        type: String,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String, // Store the image URL or file path
        required: false // Change this to false if an image is optional
    },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
