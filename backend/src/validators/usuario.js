const { check, body } = require('express-validator');
const usuarioDao = new (require('../models/Usuarios'))();

class UsuarioValidator {
    static validacoes(){
        return [
            check('nome').isLength({min: 3, max: 50})
                .withMessage('Deve ter entre 3 a 50 caracteres'),
            check('email').isEmail()
                .withMessage('Deve ser um eamil valido'),
            check('senha').isLength({min: 8, max: 19})
                .withMessage('A senha deve ter entre 8 a 15 caracteres'),
            body('email').custom(async email => {
                let user = await usuarioDao.buscarPorEmail(email)
                user = user[0]

                if (user)
                    return Promise.reject('E-mail já está em uso')
            })
        ]
    }
}
module.exports = UsuarioValidator;