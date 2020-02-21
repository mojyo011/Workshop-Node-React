const router = require('express').Router();
const authController = require('../Controllers/autenticacao');
const UsuarioValidator = require('../validators/usuario');

router.post('/registrar', UsuarioValidator.validacoes(), authController.registrar);
router.post('/autenticar', authController.autenticar);

module.exports = router;