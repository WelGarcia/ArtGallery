const { body, validationResult } = require('express-validator');
const { VALIDATION } = require('../../config/constants');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const error = new Error(errors.array()[0].msg);
  error.status = 400;
  error.errors = errors.array();
  throw error;
}

exports.commentValidator = [
  body('content')
    .trim() // Antes do notEmpty para rejeitar texto composto só por espaços.
    .notEmpty().withMessage('O comentário não pode ser vazio.')
    .isLength({ max: VALIDATION.COMMENT_MAX }).withMessage(`O comentário deve ter no máximo ${VALIDATION.COMMENT_MAX} caracteres.`),
  validate
];
