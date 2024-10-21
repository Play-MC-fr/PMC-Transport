const express = require('express');
const router = express.Router();
const stationsControllers = require('../controllers/stationsControllers');

router.get('/', stationsControllers.getAllStations);
router.post('/find', stationsControllers.getClosestStation);
module.exports = router;