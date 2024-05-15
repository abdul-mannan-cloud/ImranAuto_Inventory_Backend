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
    type: {
        type: String,
        enum: ['Permanent', 'Temporary'],
        required: true
    },
    tour: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    balanceDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);
