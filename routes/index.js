const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/addresses', require('./addresses'));
router.use('/relationships', require('./relationships'));

module.exports = router;
