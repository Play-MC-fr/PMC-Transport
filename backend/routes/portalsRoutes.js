const express = require('express');
const router = express.Router();
const portalsControllers = require('../controllers/portalsControllers');

router.get('/', portalsControllers.getAllPortals);
module.exports = router;