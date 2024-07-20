const router = require('express').Router();
const { } = require('../controllers/users');

router.get('/', getUsers);
module.exports = router;