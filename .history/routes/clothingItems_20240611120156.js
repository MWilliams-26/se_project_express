const router = require('express').Router();
<<<<<<<< HEAD:.history/routes/clothingItems_20240719230544.js

const { createItem, getItems, deleteItem, likeItem, unlikeItem } = require('../controllers/clothingItems');
========
const { createItem, getItems, updateItem, deleteItem, likeItem } = require('../controllers/clothingItems');
>>>>>>>> refs/remotes/origin/main:.history/routes/clothingItems_20240611120156.js

router.post('/', createItem);
router.get('/', getItems);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);

module.exports = router;