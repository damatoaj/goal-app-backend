const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const passport = require('passport');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.put('/update', passport.authenticate('jwt', {session:false}), authCtrl.update);
router.delete('/delete', passport.authenticate('jwt', {session:false}), authCtrl.delete);

module.exports = router;