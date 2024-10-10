const ClothingItem = require('../models/clothingItem');
const { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR, NOT_FOUND_ERROR, FORBIDDEN_ERROR, REQUEST_SUCCESS } = require('../utils/errors');

// GET /clothingItems

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong data fool!" });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." })
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." })
    })
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwnerId = item.owner.toString();

      if (itemOwnerId !== userId) {
        return res.status(FORBIDDEN_ERROR).send({ message: "You can't delete this item" });
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.send({ message: "Item deleted" }))
        .catch((err) => {
          console.error('Error ${err.name} with message ${err.message}');
          if (err.name === 'CastError') {
            return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
          }

          return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" })
        });
    })
    .catch((err) => {
      console.error('Error ${err.name} with message ${err.message}');
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" })
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: user } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error('Error ${err.name} with message ${err.message}');

      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    })
}

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: user } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error('Error ${err.name} with message ${err.message}');

      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};


module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
