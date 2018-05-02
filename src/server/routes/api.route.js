var express = require('express')
var restaurantController = require('../controllers/restaurant.controller');

var router = express.Router()

router.get('/api/restaurant', restaurantController.queryRestaurants)

module.exports = router;