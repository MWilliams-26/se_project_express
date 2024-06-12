const router = require('express').Router();
const { createItem, getItems,  } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.get('/:itemId', getItems);

module.exports = router;