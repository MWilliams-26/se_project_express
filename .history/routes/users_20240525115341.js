const router = require('express').Router();

router.get('/', () => console.log("GET users"));
router.get('/:userId', () => console.log)

module.exports = router;