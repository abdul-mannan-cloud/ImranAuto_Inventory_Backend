const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        saleRate: Number,
        total: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);
