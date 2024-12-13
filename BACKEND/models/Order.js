const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },

    item_code: {
        type: String,
        required: true,
        unique: true
    },

    count: {
        type: Number,
        required: true
    },
    
    price: {
        type: String,
        required: true
    },
    
    contact: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
