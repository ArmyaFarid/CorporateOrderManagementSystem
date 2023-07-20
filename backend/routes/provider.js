const express = require('express');

const router = express.Router();

const providerController = require('../controllers/provider');


router.get('/', providerController.getAlProviders);

router.get('/all-categories', providerController.getAllCatories);

router.get('/product/:category', providerController.getProductByCategory);

router.get('/fixtures', providerController.populateProvider);


module.exports = router;