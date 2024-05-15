const Item = require('../models/Item');

exports.createItem = async (req, res) => {
    const item = new Item(req.body);
    try {
        await item.save();
        res.status(201).send(item);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.send(items);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (e) {
        res.status(500).send(e);
    }
};
