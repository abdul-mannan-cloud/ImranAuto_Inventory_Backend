const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
    const bill = new Bill(req.body);
    try {
        await bill.save();
        res.status(201).send(bill);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
};

exports.getBills = async (req, res) => {
    try {
        const bills = await Bill.find({});
        res.send(bills);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).send();
        }
        res.send(bill);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, {
        }, { new: true, runValidators: true });
        if (!bill) {
            return res.status(404).send();
        }
        res.send(bill);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
};

exports.deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res.status(404).send();
        }
        res.send(bill);
    } catch (e) {
        res.status(500).send(e);
    }
};
