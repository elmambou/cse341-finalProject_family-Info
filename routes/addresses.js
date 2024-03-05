const express = require('express');
const router = express.Router();

const addressesController = require('../controllers/addresses');

router.get('/', addressesController.getAll);

router.get('/:id', addressesController.getSingle);

router.post('/', addressesController.createAddress);

router.put('/:id', addressesController.updateAddress);

router.delete('/:id', addressesController.deleteAddress);

module.exports = router;
