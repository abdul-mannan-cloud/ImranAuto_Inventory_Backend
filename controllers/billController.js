const Bill = require('../models/Bill');
const User = require('../models/User');

exports.createBill = async (req, res) => {
    const parts = req.body.date.split('-');  // Splits into ['17', '07', '2024']
    const correctedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log(req.body.items)
    const bill = new Bill({
        ...req.body,
        date: correctedDateString
    });
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
    const updateBill = req.body
    console.log(updateBill)
    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, updateBill, { new: true, runValidators: true });
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

exports.requestEditBill = async (req, res) => {
    try{
        const {bill,user} = req.body;
        const notification = new Notification({
            message:`${user.username} has requested to edit bill ${bill._id}`,
            bill:bill._id,
            user:bill.customer
        });
        await notification.save();
    }catch (e) {
        res.status(500).send(e)
    }
}

exports.grantAccessToEdit = async (req, res) => {
    try{
        const {bill,user_id} = req.body;
        const user = await User.findById(user_id);
        user.grants.push(bill._id);
        await user.save();
        res.send(user);
    }catch (e) {
        res.status(500).send(e)
    }
}