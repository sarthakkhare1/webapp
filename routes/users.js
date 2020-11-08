const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.sighUp);
router.get('/sign-in',userController.sighIn);

router.post('/create',userController.create);
//also use passport as middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : 'users/sign-in'},
),userController.createSession);
module.exports = router;