// const connection = require('../infra/conexao')

const baseQuery = require('./base_query');

class Usuarios {
    insere(usuario){
        // return new Promise((resolve, reject) => {
            return baseQuery ('INSERT INTO usuarios SET ? ', usuario)

            // connection.query(sql, usuario, (erro, retorno) => {
            //     if(erro) reject('Erro ao salvar: ' + erro)
            //     else{
            //         usuario = {id: retorno.insertId, ...usuario}
            //         resolve(usuario)
            //     }
            // })
        // })
        
    }

    buscarPorEmail(email){
        // return new Promise((resolve, reject) => {
            return baseQuery ('SELECT * FROM usuarios WHERE email = ? ', email);

            // connection.query(sql, email, (erro, retorno) => {
            //     if(erro) reject('Erro ao consultar: ' + erro)
            //     else{
            //     }
            //     resolve(retorno[0])
            // })
        // })
    }

}
module.exports = Usuarios;