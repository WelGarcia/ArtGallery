const commentService = require('./commentService');
const { success } = require('../../middlewares/apiResponse');

exports.addComment = async (req, res) => {
  // Ordem: userId, artworkId, content (a mesma do service).
  const comment = await commentService.addComment(req.user.id, req.params.artworkId, req.body.content);
  return success(res, comment, 'Comentário adicionado com sucesso!', 201);
};

exports.getComments = async (req, res) => {
  const comments = await commentService.getCommentsByArtworkId(req.params.artworkId);
  return success(res, comments);
};
