const router = require('express').Router();
const { createItem, getItems, updateItem, de } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.put('/:itemId', updateItem);

module.exports = router;