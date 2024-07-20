const router = require('express').Router();
const { authorize } = require('../middlewares/auth');
const { } = require('../controllers/users');

router.get('/me', authorize, getCurrentUser);
module.exports = router;