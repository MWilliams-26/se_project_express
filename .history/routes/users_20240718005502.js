const router = require('express').Router();
const { } = require('../controllers/users');

router.get('/', getCurrentUsers);
module.exports = router;