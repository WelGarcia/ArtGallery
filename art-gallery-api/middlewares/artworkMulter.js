const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads/artworks')),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `artwork-${suffix}${path.extname(file.originalname)}`);
  }
});

module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    cb(new Error('Tipo de arquivo inválido. Envie uma imagem.'), false);
  },
  limits: { fileSize: 100 * 1024 * 1024 }
});
