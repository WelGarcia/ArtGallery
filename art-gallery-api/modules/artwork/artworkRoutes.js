const express = require('express');
const router = express.Router();
const controller = require('./artworkController');
const { uploadValidator } = require('./artworkValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const { optionalAuth } = require('../../middlewares/optionalAuth');
const artworkMulter = require('../../middlewares/artworkMulter');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/artworks/upload', isAuthenticated, artworkMulter.single('image'),
  uploadValidator, asyncHandler(controller.uploadArtwork));

router.get('/my-artworks', isAuthenticated, asyncHandler(controller.getMyArtworks));
router.get('/artworks/:id/edit', isAuthenticated, asyncHandler(controller.getArtworkForEdit));
router.put('/artworks/:id', isAuthenticated, artworkMulter.single('image'),
  uploadValidator, asyncHandler(controller.updateArtwork));
router.delete('/artworks/:id', isAuthenticated, asyncHandler(controller.deleteArtwork));

// Rota pública: com token válido identifica o dono; sem token continua pública.
router.get('/artworks/:id', optionalAuth, asyncHandler(controller.getArtworkDetails));

module.exports = router;
