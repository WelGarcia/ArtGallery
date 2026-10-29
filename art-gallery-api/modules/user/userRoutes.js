const express = require('express');
const router = express.Router();
const userController = require('./userController');
const { registerValidator, loginValidator, profileUpdateValidator } = require('./userValidator');
const profileMulter = require('../../middlewares/profileMulter');
const asyncHandler = require('../../middlewares/asyncHandler');
const { isAuthenticated } = require('../../middlewares/auth');
const { optionalAuth } = require('../../middlewares/optionalAuth');

router.post('/register', registerValidator, asyncHandler(userController.register));
router.post('/login', loginValidator, asyncHandler(userController.login));
router.post('/logout', asyncHandler(userController.logout));
router.get('/profile/me', isAuthenticated, asyncHandler(userController.getMyProfile));
router.put('/profile/me', isAuthenticated, profileMulter.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), profileUpdateValidator, asyncHandler(userController.updateProfile));
router.get('/profile/:username', optionalAuth, asyncHandler(userController.getPublicProfile));

router.get('/feed', isAuthenticated, asyncHandler(userController.getFeed));

module.exports = router;
