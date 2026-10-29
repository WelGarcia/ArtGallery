const jwt = require('jsonwebtoken');

function getJwtConfig() {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

  if (!secret) {
    throw new Error('JWT_SECRET não configurado no arquivo .env.');
  }

  return { secret, expiresIn };
}

function generateToken(user) {
  const { secret, expiresIn } = getJwtConfig();
  return jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    secret,
    { expiresIn }
  );
}

function verifyToken(token) {
  const { secret } = getJwtConfig();
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };
