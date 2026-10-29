const express = require('express');
const router = express.Router();
const controller = require('./likeController');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/artworks/:artworkId/toggle-like', isAuthenticated, asyncHandler(controller.toggleLike));
router.get('/artworks/:artworkId/like-status', isAuthenticated, asyncHandler(controller.checkLikeStatus));
router.get('/liked-artworks', isAuthenticated, asyncHandler(controller.getLikedArtworks));

module.exports = router;
