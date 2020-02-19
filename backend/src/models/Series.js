//importando a conexao (arquivo connection na pasta infra)
// const connection = require('../infra/conexao');
//ele retorna uma promesa com os dados q passei
const baseQuery = require('./base_query');

// classe
class Series{
    //metodo
    lista(){
        // promise recebe duas funções, callback de resolve e callback de reject
        // return new Promise((resolve, reject) => {
        return baseQuery ('SELECT * FROM series');

            // connection.query(sql, (erro, retorno) => {
            //     //se houver erro passar o reject com a seguinte mensagem..
            //     if(erro){
            //         reject('Erro ao consultar' + erro)
            //     }else{
            //         console.log('Funcionaaaaaaaaaa @w@')
            //         resolve(retorno)
            //     }
            // })
        // })
    }

    //metodo para inserir
    insere(serie){
        // return new Promise((resolve, reject) => {
            return baseQuery ('INSERT INTO series SET ? ', serie);
            
            // console.log(serie)

            // connection.query(sql, serie, (erro, retorno) => {
            //     if(erro){
            //         reject('Erro ao inserir' + erro)
            //     }else{
            //         resolve(retorno)
            //     }
            // })
            // para mais de um parametro basta usar outros ? exemplo...
            /* INSERT INTO series SET ?, ?, ? 
                connection.query(sql, [serie, algumacoisa, seila])
            */
        // })
    }

    atualiza(serie){
        // return new Promise((resolve, reject) => {
            return baseQuery (' UPDATE series SET ? WHERE id = ? ', [serie, serie.id])
            
            // console.log(serie)

            // connection.query(sql, [serie,serie.id], (erro, retorno) => {
            //     if(erro){
            //         reject('Erro ao atualizar: ' + erro)
            //     }else{
            //         resolve(retorno)
            //     }
            // })
            // para mais de um parametro basta usar outros ? exemplo...
            /* INSERT INTO series SET ?, ?, ? 
                connection.query(sql, [serie, algumacoisa, seila])
            */
        // })
    }

    buscaPorId(id){
        // return new Promise((resolve, reject) => {
            return baseQuery ('SELECT * FROM series WHERE id = ?', id);

            // connection.query(sql, id, (erro, retorno) => {
            //     if(erro) reject('erro ao buscar' + erro)
            //     else{
            //         resolve(retorno[0])
            //     }
            // })
        // })
    }

    delete(id){
        // return new Promise((resolve, reject) => {
            return baseQuery ('DELETE FROM series WHERE id = ? ', id);

            // connection.query(sql, id, (erro, retorno) => {
            //     if(erro) reject('Erro ao apagar' + erro)
            //     else{
            //         resolve(retorno);
            //     }
            // })
        // })

    }
}


module.exports = Series;