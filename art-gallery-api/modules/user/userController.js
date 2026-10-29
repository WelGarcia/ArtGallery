const userService = require('./userService');
const artworkService = require('../artwork/artworkService');
const { success } = require('../../middlewares/apiResponse');

exports.register = async (req, res) => {
  const { username, email, password, fullName } = req.body;
  return success(res, await userService.registerUser(username, email, password, fullName), 'Conta criada com sucesso! Faça login para continuar.', 201);
};

exports.login = async (req, res) => {
  const { login, email, password } = req.body;
  const result = await userService.loginUser(login || email, password);
  return success(res, result, `Bem-vindo de volta, ${result.user.username}!`);
};

exports.logout = async (req, res) => success(res, null, 'Logout realizado com sucesso.');

exports.getMyProfile = async (req, res) => success(res, await userService.getUserProfile(req.user.id));

exports.getPublicProfile = async (req, res) => {
  const user = await userService.getPublicProfile(req.params.username);
  const isOwner = !!(req.user && req.user.id === user.id);
  return success(res, { ...user.toJSON(), isOwner });
};

exports.updateProfile = async (req, res) => {
  const { fullName, bio } = req.body;
  const file = req.files?.profilePicture?.[0] || req.files?.photo?.[0];
  const profilePicture = file ? file.filename : null;
  return success(res, await userService.updateUserProfile(req.user.id, fullName, bio, profilePicture), 'Perfil atualizado com sucesso.');
};

exports.getFeed = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 12);
  const artworks = await artworkService.getFeedArtworks(page, limit);
  return success(res, artworks);
};
