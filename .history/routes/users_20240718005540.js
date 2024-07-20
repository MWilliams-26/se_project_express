const router = require('express').Router();
const 
const { } = require('../controllers/users');

router.get('/me', authorize, getCurrentUser);
module.exports = router;