const router = require('express').Router();

router.get('/', () => console.log("GET users"));
router.get('/:userI')

module.exports = router;