const { verifyToken } = require('../config/jwt');

function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'Não autorizado.', errors: [] });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado.', errors: [] });
  }
}

module.exports = { isAuthenticated };
