const router = require('express').Router();
const { } = require('../controllers/users');

router.get('/', getCurrentUser);
module.exports = router;