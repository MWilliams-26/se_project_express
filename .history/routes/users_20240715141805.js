const router = require('express').Router();
const { getUsers, createUser, getUser, log } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;