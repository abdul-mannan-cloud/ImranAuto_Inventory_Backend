const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/', vendorController.createVendor);
router.get('/', vendorController.getVendors);
router.get('/:id', vendorController.getVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);
router.put('/:id/balance',vendorController.addBalance);
router.get('/:id/bills', vendorController.getVendorByBillId);

module.exports = router;
