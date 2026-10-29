const sequelize = require('../../config/database');
const Comment = require('./commentModel');
const Artwork = require('../artwork/artworkModel');
const User = require('../user/userModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findArtworkOrFail(artworkId) {
  const artwork = await Artwork.findByPk(artworkId);
  if (!artwork) {
    const error = new Error('Obra não encontrada.');
    error.status = 404;
    throw error;
  }
  return artwork;
}

async function addComment(userId, artworkId, content) {
  const artwork = await findArtworkOrFail(artworkId);
  const created = await sequelize.transaction(async (t) => {
    const comment = await Comment.create({ userId, artworkId: artwork.id, content }, { transaction: t });
    await artwork.increment('commentsCount', { transaction: t });
    return comment;
  });
  // Reconsulta com autor para permitir inserção imediata no frontend.
  return Comment.findByPk(created.id, { include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }] });
}

async function getCommentsByArtworkId(artworkId) {
  const artwork = await findArtworkOrFail(artworkId);
  return Comment.findAll({
    where: { artworkId: artwork.id },
    include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
    order: [['createdAt', 'DESC'], ['id', 'DESC']]
  });
}

module.exports = { addComment, getCommentsByArtworkId };
