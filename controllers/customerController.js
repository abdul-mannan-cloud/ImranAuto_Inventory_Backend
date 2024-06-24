const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).send(customer);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.send(customers);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send();
        }
        res.send(customer);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!customer) {
            return res.status(404).send();
        }
        res.send(customer);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).send();
        }
        res.send(customer);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.addBalance = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, { $inc: { balance: req.body.balance } }, { new: true, runValidators: true });
        if (!customer) {
            return res.status(404).send();
        }
        res.send(customer);
    } catch (e) {
        res.status(400).send(e);
    }
}