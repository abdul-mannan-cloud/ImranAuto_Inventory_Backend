const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require("../middleware/multer");

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);
router.get('/:id/rates', itemController.getItemRatesById);
router.get('/:id/quantity', itemController.reduceItemQuantityById);

module.exports = router;
