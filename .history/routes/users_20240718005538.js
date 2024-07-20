const router = require('express').Router();

const { } = require('../controllers/users');

router.get('/me', authorize, getCurrentUser);
module.exports = router;