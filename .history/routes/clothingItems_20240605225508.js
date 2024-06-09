const router = require('express').Router();
const { createItem } = require('../controllers/clothingItems');

router.post('/', createItem);

router.use((req, res) => {
  res.status(500).send
})

module.exports = router;