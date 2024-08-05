const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const {authMiddleware, adminMiddleware} = require("../middleware/auth");

router.post('/', billController.createBill);
router.get('/', billController.getBills);
router.get('/:id', billController.getBill);
router.put('/:id',authMiddleware, billController.updateBill);
router.delete('/:id', billController.deleteBill);

module.exports = router;
