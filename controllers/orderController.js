const OrderChalan = require('../models/order');

exports.createOrderChalan = async (req, res) => {
    const orderChalan = new OrderChalan(req.body);
    try {
        await orderChalan.save();
        res.status(201).send(orderChalan);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getOrderChalans = async (req, res) => {
    try {
        const orderChalans = await OrderChalan.find({});
        res.send(orderChalans);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getOrderChalan = async (req, res) => {
    try {
        const orderChalan = await OrderChalan.findById(req.params.id);
        if (!orderChalan) {
            return res.status(404).send();
        }
        res.send(orderChalan);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateOrderChalan = async (req, res) => {
    try {
        const orderChalan = await OrderChalan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!orderChalan) {
            return res.status(404).send();
        }
        res.send(orderChalan);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteOrderChalan = async (req, res) => {
    try {
        const orderChalan = await OrderChalan.findByIdAndDelete(req.params.id);
        if (!orderChalan) {
            return res.status(404).send();
        }
        res.send(orderChalan);
    } catch (e) {
        res.status(500).send(e);
    }
};
