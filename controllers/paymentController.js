const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    const payment = new Payment(req.body);
    try {
        await payment.save();
        res.status(201).send(payment);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({});
        res.send(payments);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.send(payment);
    } catch (e) {
        res.status(500).send(e);
    }
};
