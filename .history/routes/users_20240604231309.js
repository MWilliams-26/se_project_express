const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', createUser);
router.post('/', () => console.log("POST users"));

module.exports = router;