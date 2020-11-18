const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/sign-up',userController.sighUp);
router.get('/sign-in',userController.sighIn);

router.post('/create',userController.create);
//also use passport as middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-up'},
),userController.createSession);
// router.post('/create-session', function(req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });
router.get('/sign-out',userController.destroySession);
module.exports = router;