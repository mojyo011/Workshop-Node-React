const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const usuarioDao = new (require('../models/Usuarios'))();

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

gerarToken = (params) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 60,
    })
}

module.exports = {
    async registrar(req,res) {
        const erros = validationResult(req)
        
        if(!erros.isEmpty()){
            return res.status(400).send(erros)
        }

        let usuario = req.body

        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
            
            const resultado = await usuarioDao.insere(usuario);

            usuario = {id: resultado.insertId, ...usuario};

            return res.status(201).send({
                ...usuario,
                token: gerarToken({id: usuario.id})
            })
        } catch(erro) {
            return res.status(500).send(erro)
        }
    },

    async autenticar(req, res) {
        const {email, senha} = req.body;

        try{
            const usuario = await usuarioDao.buscarPorEmail(email);

            if(!usuario)
                return res.status(400).send({erro: 'Usuario não cadastrado'});
            if(!bcrypt.compare(senha, usuario.senha))
                return res.status(400).send({erro: 'Senha inválida'})

                res.send({
                    usuario, 
                    token: gerarToken({id: usuario.id})
                });
                
        } catch(erro){
            console.log(erro);
            res.status(500).send(erro);
        }
    }
}

// autenticacao = (app) => {
//     app.post('/registrar', UsuarioValidator.validacoes(), (req, res) => {
//         const erros = validationResult(req)
        
//         if(!erros.isEmpty()){
//             res.status(400).send(erros)
//             return
//         }

//         const usuario = req.body

//         console.log(usuario);

//         usuarioDao.insere(usuario)
//             .then(usuario =>{
//                 const token = gerarToken({id: usuario.id})
//                 res.status(201).send({usuario, token});
//             })
//             .catch(erro => res.status(500).send(erro))
//     })

//     app.post('/autenticar', async (req, res) => {
//         const {email, senha} = req.body;

//         try{
//             usuarioDao = app.models.Usuarios;
//             const usuario = await usuarioDao.buscarPorEmail(email);

//             if(!usuario)
//                 return res.status(400).send({erro: 'Usuario não cadastrado'});
//                 if(usuario.senha != senha)
//                     return res.status(400).send({erro: 'Senha inválida'})

//                 const token = gerarToken({id: usuario.id})

//                 res.send({usuario, token});
//         } catch(erro){
//             console.log(erro);
//             res.status(500).send(erro);
//         }
//     })

// }

// module.exports = autenticacao