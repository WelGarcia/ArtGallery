const sequelize = require('../../config/database');
const Like = require('./likeModel');
const Artwork = require('../artwork/artworkModel');
const User = require('../user/userModel');

async function findArtworkOrFail(artworkId) {
  const artwork = await Artwork.findByPk(artworkId);
  if (!artwork) {
    const error = new Error('Obra não encontrada.');
    error.status = 404;
    throw error;
  }
  return artwork;
}

async function toggleLike(userId, artworkId) {
  const artwork = await findArtworkOrFail(artworkId);
  // Linha da curtida e contador da obra precisam ser gravados juntos.
  const liked = await sequelize.transaction(async (t) => {
    const [like, created] = await Like.findOrCreate({
      where: { userId, artworkId: artwork.id },
      defaults: { userId, artworkId: artwork.id },
      transaction: t
    });
    if (created) {
      await artwork.increment('likesCount', { transaction: t });
      return true;
    }
    await like.destroy({ transaction: t });
    await artwork.decrement('likesCount', { transaction: t });
    return false;
  });
  await artwork.reload();
  return { liked, likesCount: artwork.likesCount };
}

async function checkLikeStatus(userId, artworkId) {
  await findArtworkOrFail(artworkId);
  const like = await Like.findOne({ where: { userId, artworkId } });
  return !!like;
}

async function getLikedArtworks(userId) {
  const likes = await Like.findAll({
    where: { userId },
    include: [{ model: Artwork, include: [{
      model: User, attributes: ['id', 'username', 'fullName', 'profilePicture']
    }] }],
    order: [['createdAt', 'DESC']]
  });
  return likes.map((like) => like.Artwork);
}

module.exports = { toggleLike, checkLikeStatus, getLikedArtworks };
