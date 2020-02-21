// const jwt = require('jsonwebtoken');
// const authConfig = require('../config/auth')

const seriesDao = new (require('../models/Series'))()


module.exports = {

    // rota para listar todas as series
    async listar(req,res){
        try{
            const lista = await seriesDao.lista()

            if(lista)
                return res.send(lista)
            res.status(400).send({erro: 'Lista Vazia'})
        }catch(erro){
            console.log(erro)
            res.send(erro)
        }
           
    },

    // rota para inserir uma série
    async insere(req,res){
        let serie = req.body
        try{
            const resultado = await seriesDao.insere(serie)

            const insertedId = resultado.insertId;
                serie = { id: insertedId, ...serie}
                res.status(201).send(serie)
        }catch(erro){
            return res.status(500).send(erro)
        }

    },

    // rota para buscar uma serie pelo id
    async buscaPorId(req,res){
        const id = req.params.id

        const serie = await seriesDao.buscaPorId(id)
        //transformando a lista em um objt unico
        serie = serie[0]

        // retorna o erro
        if(!serie)
           return res.status(404).send({erro: 'serie não encontrada'})
        // retorna a serie
        res.send(serie)
    },

    // rota para atualizar as informações de uma serie (PUT -> atualiza)
    async atualiza(req, res){
        const id = req.params.id
        const serie = req.body
        serie.id = id

        const retorno = await seriesDao.atualiza(serie)

        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'serie não encontrada'})    
         res.send(serie)
    },

    // rota para deletar uma série
    async delete(req, res){
        const id = req.params.id

        const retorno = await seriesDao.delete(id)

        if(!retorno.affectedRows)
            return res.status(404).send({erro: 'serie não encontrada'})
        res.status(204).send()
    }

}


// quando é autenticado geramos um token, e o token fica salvo por 60s
//o usuario armazena o token depois de um tempo o token fica invalido, então para gerar outro ele tem q logar de novo
//a cada autenticação o token é diferente, o timesTemp a cada milisegundo o tken é "embaralhado"
//consig está inserindo os controllers na ordem (autenticação e series) ele organiza por ordem alfabetica - é a injeção
//dos projetos e manda os require automaticamente
//meddleware é o q interrompe entre as rotas
//meddleware rotas q ficam depois do midor são publicas e as q ficam depois são privadas