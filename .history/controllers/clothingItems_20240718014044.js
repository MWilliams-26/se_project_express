const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR, FORBIDDEN_ERROR } = require('../utils/errors');

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
      return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server" });
  });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res
      .send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server." })
    })
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return res.status(FORBIDDEN_ERROR).send({ message: "You can't delete this item" });
      });
    }
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server" })
    })
}

const likeItem = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server" });
    })
}

const unlikeItem = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server" });
    })
}


module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
