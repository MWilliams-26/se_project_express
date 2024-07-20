const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR } = require('../utils/errors');

// GET /clothingItems

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner }).then((item) => {
    console.log(item);
    res.send({ data: item })
  }).catch((err) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200)
      .send(items))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Error from getItems", err })
    })
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }).orFail().then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Error from updateItem", err })
    })
}

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId).orFail().then((item) => res.status(204).send({ data: item }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Error from deleteItem", err })
    })
}

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.user;
  console.log(itemId);
  console.log(userId);
  ClothingItem.findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true },)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: 'Invalid item ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: })
        res.status(INTERNAL_SERVER_ERROR).send({ message: "Error from likeItem", err })
    });
}


module.exports = { createItem, getItems, updateItem, deleteItem, likeItem };
