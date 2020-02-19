const router = require('express').Router();
const authController = require('../Controllers/autenticacao');
const UsuarioValidator = require('../validators/usuario');

router.post('/registrar', authController.registrar);
// router.post('/autenticar', authController.autentica);

module.exports = router;