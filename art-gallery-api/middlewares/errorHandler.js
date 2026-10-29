const fs = require('fs');
const { error } = require('./apiResponse');

// Limpa apenas os arquivos efetivamente gravados pelo Multer nesta requisição.
function removeUploadedFiles(req) {
  const uploadedFiles = [];
  if (req.file) uploadedFiles.push(req.file);
  if (req.files) {
    if (Array.isArray(req.files)) uploadedFiles.push(...req.files);
    else uploadedFiles.push(...Object.values(req.files).flat());
  }
  uploadedFiles.forEach((file) => {
    if (!file.path) return;
    fs.unlink(file.path, (err) => {
      if (err) console.error('Erro ao limpar arquivo órfão:', err);
    });
  });
}

module.exports = (err, req, res, next) => {
  console.error(err);
  removeUploadedFiles(req);
  const statusCode = err.status || 500;
  const errors = err.errors || [];
  return error(res, err.message || 'Ocorreu um erro inesperado.', statusCode, errors);
};
