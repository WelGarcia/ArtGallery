const Artwork = require('./artworkModel');
const User = require('../user/userModel');
const Like = require('../like/likeModel');
const Comment = require('../comment/commentModel');
const sequelize = require('../../config/database');
const fs = require('fs');
const path = require('path');

async function uploadArtwork(title, description, imageFile, userId) {
  return sequelize.transaction(async (transaction) => {
    const artwork = await Artwork.create({
      title, description, imagePath: imageFile.filename, userId
    }, { transaction });
    await User.increment('artworksCount', { where: { id: userId }, transaction });
    return artwork;
  });
}

// Inclui apenas dados públicos do autor (nunca a senha/hash).
async function getArtworkDetails(artworkId, currentUserId = null) {
  const artwork = await Artwork.findByPk(artworkId, {
    include: [{
      model: User,
      attributes: ['id', 'username', 'fullName', 'profilePicture']
    }]
  });

  if (!artwork) {
    const error = new Error('Obra não encontrada.');
    error.status = 404;
    throw error;
  }

  // Uma visualização por consulta ao detalhe. currentUserId será útil depois.
  await artwork.increment('views');
  // No Sequelize v6/MySQL, increment() não garante atualizar a instância
  // retornada em memória. Recarregar assegura a contagem correta no JSON.
  await artwork.reload({
    include: [{
      model: User,
      attributes: ['id', 'username', 'fullName', 'profilePicture']
    }]
  });
  let isLiked = false;
  if (currentUserId) {
    const existingLike = await Like.findOne({ where: { userId: currentUserId, artworkId: artwork.id } });
    isLiked = !!existingLike;
  }
  return { artwork, isLiked };
}

async function getFeedArtworks(page = 1, limit = 12) {
  const offset = (page - 1) * limit;
  return Artwork.findAll({
    include: [{
      model: User,
      attributes: ['id', 'username', 'fullName', 'profilePicture']
    }],
    order: [['createdAt', 'DESC']],
    offset,
    limit
  });
}


// Somente as obras do usuário autenticado, da mais nova para a mais antiga.
async function getArtworksByUser(userId) {
  return Artwork.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
}

// Diferente do detalhe público, esta consulta não incrementa visualizações.
async function getArtworkForEdit(artworkId, userId) {
  const artwork = await Artwork.findByPk(artworkId);
  if (!artwork) {
    const error = new Error('Obra não encontrada.');
    error.status = 404;
    throw error;
  }
  if (artwork.userId !== userId) {
    const error = new Error('Você não tem permissão para editar esta obra.');
    error.status = 403;
    throw error;
  }
  return artwork;
}

async function updateArtwork(artworkId, userId, title, description, newImageFile) {
  const artwork = await getArtworkForEdit(artworkId, userId);
  // Guardar o nome ANTES da alteração para apagar a imagem antiga só após o save.
  const oldImageFilename = newImageFile ? artwork.imagePath : null;
  artwork.title = title;
  artwork.description = description || '';
  if (newImageFile) artwork.imagePath = newImageFile.filename;
  await artwork.save();

  if (oldImageFilename) {
    const oldImagePath = path.join(__dirname, '../../public/uploads/artworks', oldImageFilename);
    fs.unlink(oldImagePath, (err) => {
      if (err) console.error('Erro ao apagar imagem antiga:', err);
    });
  }
  return artwork;
}

async function deleteArtwork(artworkId, requestingUserId, isAdmin = false) {
  const artwork = await Artwork.findByPk(artworkId);
  if (!artwork) {
    const error = new Error('Obra não encontrada.');
    error.status = 404;
    throw error;
  }
  if (!isAdmin && artwork.userId !== requestingUserId) {
    const error = new Error('Você não tem permissão para excluir esta obra.');
    error.status = 403;
    throw error;
  }

  // Excluir o registro e atualizar o contador em uma transação no banco.
  await sequelize.transaction(async (transaction) => {
    await Like.destroy({ where: { artworkId: artwork.id }, transaction });
    await Comment.destroy({ where: { artworkId: artwork.id }, transaction });
    await artwork.destroy({ transaction });
    await User.decrement('artworksCount', { where: { id: artwork.userId }, transaction });
  });

  // Só depois de confirmar o banco, remover o arquivo único (Grupo B).
  const imageFilePath = path.join(__dirname, '../../public/uploads/artworks', artwork.imagePath);
  fs.unlink(imageFilePath, (err) => {
    if (err) console.error('Erro ao apagar imagem da obra excluída:', err);
  });
}

module.exports = {
  uploadArtwork, getArtworkDetails, getFeedArtworks,
  getArtworksByUser, getArtworkForEdit, updateArtwork, deleteArtwork
};

