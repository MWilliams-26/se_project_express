const router = require('express').Router();

router.get('/', () => console.log("RETURN ALL CLOTHES"));
router.get('/', () => console.log("NEW CLOTHES"));
router.get('/:itemId', () => console.log("DELETE CLOTHES"));
