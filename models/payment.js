const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
