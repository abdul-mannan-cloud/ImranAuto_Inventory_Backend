const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tour: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Customer', customerSchema);
