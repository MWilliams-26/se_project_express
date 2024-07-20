const router = require('express').Router();
const { getUsers }

router.get('/', getUsers);
router.get('/:userId', () => console.log("GET users by ID"));
router.post('/', () => console.log("POST users"));

module.exports = router;