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

exports.registerValidator = [
  body('username').trim().isLength({ min: VALIDATION.USERNAME_MIN, max: VALIDATION.USERNAME_MAX }).withMessage(`O nome de usuário deve ter entre ${VALIDATION.USERNAME_MIN} e ${VALIDATION.USERNAME_MAX} caracteres.`),
  body('email').isEmail().withMessage('Por favor, insira um e-mail válido.').normalizeEmail(),
  body('password').isLength({ min: VALIDATION.PASSWORD_MIN }).withMessage(`A senha deve ter pelo menos ${VALIDATION.PASSWORD_MIN} caracteres.`),
  body('confirmPassword').custom((value, { req }) => { if (value !== req.body.password) throw new Error('As senhas não coincidem.'); return true; }),
  body('fullName').trim().notEmpty().withMessage('O nome completo é obrigatório.'),
  validate
];

exports.loginValidator = [
  body('login').optional({ checkFalsy: true }).trim(),
  body('email').optional({ checkFalsy: true }).trim(),
  body().custom((_, { req }) => {
    if (!req.body.login && !req.body.email) throw new Error('E-mail ou usuário é obrigatório.');
    return true;
  }),
  body('password').notEmpty().withMessage('A senha é obrigatória.'),
  validate
];

exports.profileUpdateValidator = [
  body('fullName').trim().notEmpty().withMessage('O nome completo é obrigatório.'),
  body('bio').optional({ checkFalsy: true }).isLength({ max: VALIDATION.BIO_MAX }).withMessage(`A bio deve ter no máximo ${VALIDATION.BIO_MAX} caracteres.`).trim(),
  validate
];
