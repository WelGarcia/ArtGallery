const { body, validationResult } = require('express-validator');
const { VALIDATION } = require('../../config/constants');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const error = new Error(errors.array()[0].msg);
  error.status = 400;
  error.errors = errors.array();
  throw error;
};

exports.uploadValidator = [
  body('title').trim().notEmpty().withMessage('O título é obrigatório.')
    .isLength({ max: VALIDATION.TITLE_MAX }).withMessage(`O título deve ter no máximo ${VALIDATION.TITLE_MAX} caracteres.`),
  body('description').optional({ checkFalsy: true }).trim()
    .isLength({ max: VALIDATION.DESCRIPTION_MAX }).withMessage(`A descrição deve ter no máximo ${VALIDATION.DESCRIPTION_MAX} caracteres.`),
  validate
];
