const router = require('express').Router();
const { createItem } = require('../controllers/clothingItems');

router.get('/', ()));
router.get('/', () => console.log("NEW CLOTHES"));
router.get('/:itemId', () => console.log("DELETE CLOTHES"));

module.exports = router;