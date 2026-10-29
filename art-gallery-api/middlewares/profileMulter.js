const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads/profiles')),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `profile-${req.user.id}-${Date.now()}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) return cb(null, true);
  const error = new Error('A foto de perfil deve ser uma imagem.');
  error.status = 400;
  return cb(error);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }
});
