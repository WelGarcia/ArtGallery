const User = require('./userModel');
const Artwork = require('../artwork/artworkModel');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { generateToken } = require('../../config/jwt');
const fs = require('fs');
const path = require('path');

async function registerUser(username, email, password, fullName) {
  const emailExists = await User.findOne({ where: { email } });
  const usernameExists = await User.findOne({ where: { username } });

  if (emailExists || usernameExists) throw new Error('Este e-mail ou usuário já está cadastrado.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ username, email, password: hashedPassword, fullName });

  return { id: newUser.id, username: newUser.username, email: newUser.email };
}

async function loginUser(login, password) {
  const user = await User.findOne({ where: { [Op.or]: [{ email: login }, { username: login }] } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('E-mail ou senha inválidos.');
  }

  const safeUser = {
    id: user.id, username: user.username, email: user.email, fullName: user.fullName,
    profilePicture: user.profilePicture, isAdmin: user.isAdmin
  };
  return { token: generateToken(user), user: safeUser };
}

async function getUserProfile(userId) {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'fullName', 'bio', 'profilePicture', 'followersCount', 'followingCount', 'artworksCount', 'isAdmin']
  });
  if (!user) { const error = new Error('Usuário não encontrado.'); error.status = 404; throw error; }
  return user;
}

async function getPublicProfile(username) {
  const user = await User.findOne({
    where: { username },
    attributes: ['id', 'username', 'fullName', 'bio', 'profilePicture', 'followersCount', 'followingCount', 'artworksCount'],
    include: [{ model: Artwork, attributes: ['id', 'title', 'imagePath', 'views', 'likesCount', 'commentsCount'] }],
    order: [[Artwork, 'createdAt', 'DESC']]
  });
  if (!user) { const error = new Error('Usuário não encontrado.'); error.status = 404; throw error; }
  return user;
}

async function updateUserProfile(userId, fullName, bio, profilePicture) {
  const user = await User.findByPk(userId);
  if (!user) { const error = new Error('Usuário não encontrado.'); error.status = 404; throw error; }

  const oldPicture = user.profilePicture;
  user.fullName = fullName;
  user.bio = bio || null;
  if (profilePicture) user.profilePicture = profilePicture;
  await user.save();

  if (profilePicture && oldPicture && oldPicture !== 'default-profile.png' && oldPicture !== profilePicture) {
    const oldPath = path.join(__dirname, '../../public/uploads/profiles', oldPicture);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return getUserProfile(userId);
}

module.exports = { registerUser, loginUser, getUserProfile, getPublicProfile, updateUserProfile };
