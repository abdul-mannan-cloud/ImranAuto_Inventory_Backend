const express = require('express');
const router = express.Router();
const orderChalanController = require('../controllers/orderController');

router.post('/', orderChalanController.createOrderChalan);
router.get('/', orderChalanController.getOrderChalans);
router.get('/:id', orderChalanController.getOrderChalan);
router.put('/:id', orderChalanController.updateOrderChalan);
router.delete('/:id', orderChalanController.deleteOrderChalan);

module.exports = router;
