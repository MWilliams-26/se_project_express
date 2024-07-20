const router = require('express').Router();

router.get('/', () => console.log("GET users"));
router.get('/:userId', () => console.log("GET"))

module.exports = router;