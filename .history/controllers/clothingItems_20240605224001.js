const ClothingItem = require('../models/clothingItem');

// GET /clothingItems

const getItems = (req, res) => {
  ClothingItem.find({})
   .then((items) => res.status(200).send(items))
   .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};
}

module.exports = { getItems };