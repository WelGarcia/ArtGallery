const artworkService = require('./artworkService');
const { success } = require('../../middlewares/apiResponse');

exports.uploadArtwork = async (req, res) => {
  if (!req.file) {
    const error = new Error('Envie uma imagem da obra.');
    error.status = 400;
    throw error;
  }
  const { title, description } = req.body;
  const artwork = await artworkService.uploadArtwork(title, description || '', req.file, req.user.id);
  return success(res, artwork, 'Obra enviada com sucesso!', 201);
};

exports.getArtworkDetails = async (req, res) => {
  const currentUserId = req.user ? req.user.id : null;
  const { artwork, isLiked } = await artworkService.getArtworkDetails(req.params.id, currentUserId);
  const isOwner = currentUserId === artwork.userId;
  return success(res, { ...artwork.toJSON(), isOwner, isLiked });
};


exports.getMyArtworks = async (req, res) => {
  const artworks = await artworkService.getArtworksByUser(req.user.id);
  return success(res, artworks);
};

exports.getArtworkForEdit = async (req, res) => {
  const artwork = await artworkService.getArtworkForEdit(req.params.id, req.user.id);
  return success(res, artwork);
};

exports.updateArtwork = async (req, res) => {
  const { title, description } = req.body;
  const updatedArtwork = await artworkService.updateArtwork(
    req.params.id, req.user.id, title, description, req.file || null
  );
  return success(res, updatedArtwork, 'Obra atualizada com sucesso!');
};

exports.deleteArtwork = async (req, res) => {
  await artworkService.deleteArtwork(req.params.id, req.user.id, false);
  return success(res, null, 'Obra excluída com sucesso.');
};
