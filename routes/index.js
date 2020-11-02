const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for any other router use
// router.use('/path',require('./filename'));
module.exports = router;