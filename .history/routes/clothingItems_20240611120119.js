const router = require('express').Router();
const { createItem, getItems, updateItem, deleteItem, lik } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

module.exports = router;