const express = require('express');
const router = express.Router();
const stationsController = require('../controllers/stationsControllers');

router.get('/', stationsController.getAllStations);
router.post('/find', stationsController.findClosestStation);
module.exports = router;