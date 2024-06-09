const ClothingItem = require('../models/clothingItem');

// GET /clothingItems

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
}