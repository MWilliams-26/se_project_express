const ClothingItem = require('../models/clothingItem');

// GET /clothingItems

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl }).then((item) => {
    console.log(item);
    res.send({ data: item })
  }).catch((err) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err.message });
  });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200)
      .send(items))
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err })
    })
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }).orFail().then((item) => res.status(200).send({ data: item }))
      .catch((err) => {
        res.status(500).send({ message: "Error from updateItem", err })
      })
}

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId).orFail().then((item) => res.status(204).send({ data: item }))
  
}

module.exports = { createItem, getItems, updateItem };