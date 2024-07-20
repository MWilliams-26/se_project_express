const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { get} = require('../controllers/users');

router.get('/me', auth, getCurrentUser);
module.exports = router;