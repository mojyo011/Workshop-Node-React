// const jwt = require('jsonwebtoken');
// const authConfig = require('../config/auth');
//transformasndo o require em um objeto e chamando o mesmo objeto
const seriesDao = new (require('../models/Series'))();

//Dando nome ou crando uma variavel e colocando-a em uma função
// series = () => {

module.exports = {

    async listar(req, res){
        const lista = await seriesDao.lista();

        if(lista)
            return res.send(lista);

        return res.status(404).send();
    
    },

    //mapeamento para rota get de "\series" temos q passar em callback para ver a requisição
    // app.get('/series', (req, res) => {
    //     var seriesDao = app.models.Series;

    //     seriesDao.lista()
    //         .then(resultado => {
    //             res.send(resultado)
    //         })
    //         .catch(erro => {
    //             console.log('erro ao consultar' + erro);
    //         })
    // });

    async insere(req, res) {
        let serie = req.body;

        try{
            const resultado = await seriesDao.insere(serie);

            const insertId  = resultado.insertId;
            serie = {id:insertId, ...serie}
            res.status(201).send(serie);

            return res.status(400).send(serie);

        } catch(erro){
            return res.status(400).send({erro})
        }
    },

    // rota do post para mostrar a página de series
    // app.post('/series', (req, res) => {
    //     const seriesDao = app.models.Series;

    //     let serie = req.body;

    //     seriesDao.insere(serie)
    //         .then(resultado => {
    //             const insertedId = resultado.insertId;
    //             serie = { id: insertedId, ...serie}
    //             res.status(201).send(serie)
    //         })
    //         .catch(erro => {
    //             console.log('erro ao inserir' + erro)
    //             res.status(500).send(erro)
    //         })
    // })

    async buscaPorId(req, res) {
        const id = req.params.id;

        let serie = await seriesDao.buscaPorId(id);

        if(!serie)
            return res.status(404).send({erro: 'Serie não encontrada'});

        res.send(serie);
    },

    // app.get('/series/:id', (req, res) => {
    //     const id = req.params.id
    //     const seriesDao = app.models.Series
    //     seriesDao.buscaPorId(id)
    //         .then(serie => {
    //             if(!serie){
    //                 res.status(404).send({erro: 'serie não encontrada'})
    //             }else{
    //                 res.send(serie);
    //             }
    //         })
    //         .catch(erro => {
    //             console.log('erro ao buscar serie' + erro);
    //             res.status(500).send({erro: 'erro ao buscar'})
    //         })
    // })

    async atualiza(req, res) {
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        const retorno = await seriesDao.atualiza(serie);
        
        if(!retorno.affectedRows){
            return res.status(404).send({erro: 'Serie atualizada'})
        }
        res.send(serie);
    },

    // app.put('/series/:id', (req, res) => {
    //     const id = req.params.id
    //     const serie = req.body
    //     serie.id = id

    //     seriesDao = app.models.Series

    //     seriesDao.atualiza(serie)
    //         .then(retorno => {
    //             if(!retorno.affectedRows){
    //                 res.status(404).send({erro: 'Serie não encontrada'})
    //                 return
    //             }
    //             req.send(serie)
    //         })
    //         .catch(erro => res.status(500).send(erro))
    // })

    async delete(req, res) {
        const id = req.params.id;

        const retorno = await seriesDao.delete(id);

        if(!retorno.affectedRows)
            return res.status(204).send({erro: 'Serie não encontrada'})

        res.status(204).send();
    }

    // app.delete('/series/:id', (req, res) => {
    //     const id = req.params.id

    //     const seriesDao = app.models.Series

    //     seriesDao.delete(id)
    //         .then(retorno => {
    //             if(retorno.affectedRows){
    //                 res.status(404).send({erro: 'serie não encontrada'})
    //                 //return para não continuar o codigo
    //                 return
    //             }
    //             //204 -> deletado com sucesso
    //             res.status(204).send()
    //         })
    //         .catch(erro => {
    //             console.log('Erro ao deletar' + erro);
    //             res.status(500).send({erro: 'erro ao deletar'})
    //         })
    // })

}


// quando é autenticado geramos um token, e o token fica salvo por 60s
//o usuario armazena o token depois de um tempo o token fica invalido, então para gerar outro ele tem q logar de novo
//a cada autenticação o token é diferente, o timesTemp a cada milisegundo o tken é "embaralhado"
//consig está inserindo os controllers na ordem (autenticação e series) ele organiza por ordem alfabetica - é a injeção
//dos projetos e manda os require automaticamente
//meddleware é o q interrompe entre as rotas 
//meddleware rotas q ficam depois do midor são publicas e as q ficam depois são privadas