const router = require('express').Router();
const { createItem } = require('../controllers/clothingItems');

router.post('/', createItem);

router.use((req, re))

module.exports = router;