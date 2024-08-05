const Item = require('../models/Item');
const Bill = require('../models/Bill');

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

exports.getItemRatesById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const bills = await Bill.find({ 'items.itemId': itemId })
            .populate('customer', 'name')
            .select('items customer createdAt')
            .lean();


        const rates = bills.flatMap(bill => {
            return bill.items
                .filter(item => item.itemId.toString() === itemId)
                .map(item => ({
                    customerName: bill.customer.name,
                    saleRate: item.saleRate,
                    purchaseRate: item.purchaseRate,
                    date: new Date(bill.createdAt).toLocaleDateString()
                }));
        });

        res.json(rates);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to get item rates' });
    }
};

exports.reduceItemQuantityById = async (req, res) => {
    try {
        const quantity = req.query.quantity;
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        item.quantity -= quantity;
        await item.save();
        res.send(item);
    } catch (e) {
        res.status(500).send(e);
    }
}