const router = require('express').Router();
<<<<<<<< HEAD:.history/routes/clothingItems_20240719230553.js
const 
const { createItem, getItems, deleteItem, likeItem, unlikeItem } = require('../controllers/clothingItems');
========
const { createItem, getItems, updateItem, deleteItem, likeItem } = require('../controllers/clothingItems');
>>>>>>>> refs/remotes/origin/main:.history/routes/clothingItems_20240611193835.js

router.post('/', createItem);
router.get('/', getItems);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', unlikeItem);

module.exports = router;