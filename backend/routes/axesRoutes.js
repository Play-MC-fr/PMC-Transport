const express = require('express');
const router = express.Router();
const axesControllers = require('../controllers/axesControllers');

router.get('/', axesControllers.getAllAxes);
module.exports = router;