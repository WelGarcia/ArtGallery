const likeService = require('./likeService');
const { success } = require('../../middlewares/apiResponse');

exports.toggleLike = async (req, res) => {
  const result = await likeService.toggleLike(req.user.id, req.params.artworkId);
  if (result.liked) return success(res, result, 'Obra curtida.', 201);
  return success(res, result, 'Curtida removida.');
};

exports.checkLikeStatus = async (req, res) => {
  const liked = await likeService.checkLikeStatus(req.user.id, req.params.artworkId);
  return success(res, { liked });
};

exports.getLikedArtworks = async (req, res) => {
  const artworks = await likeService.getLikedArtworks(req.user.id);
  return success(res, artworks);
};
