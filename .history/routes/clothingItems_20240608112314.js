const router = require('express').Router();
const { get } = require('mongoose');
const { createItem } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', get)

module.exports = router;