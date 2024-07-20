const router = require('express').Router();

router.get('/users', () => console.log("GET users"));
router.get('/user')

module.exports = router;