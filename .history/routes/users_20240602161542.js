const router = require('express').Router();
const { getCUsers } = require("../controllers/users");

router.get('/', getCurrentUsers);
router.get('/:userId', () => console.log("GET users by ID"));
router.post('/', () => console.log("POST users"));

module.exports = router;