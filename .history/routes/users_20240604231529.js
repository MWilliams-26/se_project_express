const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', () => console.log("GET users by ID"));
router.post('/',  => con()sole.log("POST users"));

module.exports = router;