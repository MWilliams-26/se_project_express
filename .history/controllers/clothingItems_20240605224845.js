const ClothingItem = require('../models/clothingItem');

// GET /clothingItems

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner }).then((item) => {
    console.log(item);
    res.send({data:item})
  }).catch((err) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err.message });
  });
};
}