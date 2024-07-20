const router = require('express').Router();
const { } = require('../controllers/users');

router.get('/me', getCurrentUser);
module.exports = router;