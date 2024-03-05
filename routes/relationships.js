const express = require('express');
const router = express.Router();

const relationshipsController = require('../controllers/relationships');

router.get('/', relationshipsController.getAll);

router.get('/:id', relationshipsController.getSingle);

router.post('/', relationshipsController.createRelationship);

router.put('/:id', relationshipsController.updateRelationship);

router.delete('/:id', relationshipsController.deleteRelationship);

module.exports = router;
