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
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    })
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } }).orFail().then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    })
}

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId).orFail().then((item) => res.status(204).send({ data: item }))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    })
}

const likeItem = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    })
}

const unlikeItem = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      


module.exports = { createItem, getItems, updateItem, deleteItem, likeItem };
