const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { } = require('../controllers/users');

router.get('/me', , getCurrentUser);
module.exports = router;