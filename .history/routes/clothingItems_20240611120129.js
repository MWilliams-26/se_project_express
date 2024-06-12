const router = require('express').Router();
const { createItem, getItems, updateItem, deleteItem, likeItem } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);
rout

module.exports = router;