const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUpdateUser } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', auth, validateUpdateUser, updateUser);

module.exports = router;