const ClothingItem = require('../models/clothingItem');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

// GET /clothingItems

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwnerId = item.owner.toString();

      if (itemOwnerId !== userId) {
        throw new ForbiddenError("You can't delete this item");
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.send({ message: "Item deleted" }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError("Wrong ID Fool!"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError("Wrong ID Fool!"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError("Wrong ID Fool!"));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError("That does not live here!"));
      } else {
        next(err);
      }
    })
}

const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError("Wrong ID Fool!"));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError("That does not live here!"));
      } else {
        next(err);
      }
    });
};


module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
