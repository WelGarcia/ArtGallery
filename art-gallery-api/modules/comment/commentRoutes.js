const express = require('express');
const router = express.Router();
const controller = require('./commentController');
const { commentValidator } = require('./commentValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/artworks/:artworkId/comments', isAuthenticated, commentValidator, asyncHandler(controller.addComment));
router.get('/artworks/:artworkId/comments', asyncHandler(controller.getComments));

module.exports = router;
