const router = require('express').Router();
const { createItem } = require('../controllers/clothingItems');

router.post('/', createItem);
router

module.exports = router;