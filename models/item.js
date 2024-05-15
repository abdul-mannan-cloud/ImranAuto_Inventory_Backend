const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    nameInUrdu: {
        type: String
    },
    miniUnit: {
        type: String
    },
    packaging: {
        type: String
    },
    purchaseRate: {
        type: Number,
        required: true
    },
    saleRate: {
        type: Number,
        required: true
    },
    minStock: {
        type: Number,
        required: true
    },
    addedEditDate: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    picture: {
        type: String
    }
});

module.exports = mongoose.model('Item', itemSchema);
