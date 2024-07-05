const Vendors = require('../models/Vendor');
const Bill = require('../models/Bill');

exports.createVendor = async (req, res) => {
    const vendor = new Vendors(req.body);
    try {
        await vendor.save();
        res.status(201).send(vendor);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendors.find({});
        res.send(vendors);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getVendor = async (req, res) => {
    try {
        const vendor = await Vendors.findById(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.updateVendor = async (req, res) => {
    try {
        const vendor = await Vendors.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    }
    catch (e) {
        res.status(400).send(e);
    }
}

exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendors.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.addBalance = async (req, res) => {
    try {
        const vendor = await Vendors.findById(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }
        vendor.balance += req.body.balance;
        await vendor.save();
        res.send(vendor);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getBillsByVendorId = async (req, res) => {
    try {
        const bills = await Bill.find({ vendorId: req.params.id });
        res.send(bills);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.getVendorByBillId = async (req, res) => {
    try {
        const bills = await Bill.findById(req.params.id);
        const vendor = await Vendors.findById(bills.vendorId);
        res.send(vendor);
    } catch (e) {
        res.status(500).send(e);
    }
}
