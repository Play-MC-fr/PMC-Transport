const express = require('express');
const router = express.Router();
const playersControllers = require('../controllers/playersControllers');

router.post('/location', playersControllers.getPlayerLocation);
module.exports = router;