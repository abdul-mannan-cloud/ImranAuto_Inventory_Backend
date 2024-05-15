const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
        previousRate: Number,
        partialSale: Boolean,
        wholesale: Boolean,
        packing: String,
        total: Number,
        saleRate: Number
    }],
    description: String,
    borrowedDetails: {
        previousBalance: Number,
        currentBill: Number,
        totalBill: Number,
        amountPaid: Number,
        remainingBalance: Number,
        promiseDate: Date,
        status: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
