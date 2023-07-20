const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order');


router.get('/', orderController.getAllOrders);

router.get('/history', orderController.getHistoryOrders);

router.get('/:id', orderController.getOneOrder);

router.put('/:id',orderController.modifyOrder);

router.post('/',orderController.createOrder);

module.exports = router;