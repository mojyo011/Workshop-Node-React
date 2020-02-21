import { doPublicRequest } from './baseapi-service'

const RESOURCE = 'auth/'

//nome das constantes devem ser maiusculas (aquelas que são chaves por exemplo)
const TOKEN_KEY = '@series:token'

//cadastrando o usuario
export const signIn = async (usuario) => {
    try{
        //criando uma função de retorno que recebe a url completa da autenticação + o metodo post e as informações do usuario 
        const retorno = await doPublicRequest(RESOURCE + 'autenticar/', 'POST', usuario)
        
        //se o retorno for oou seja se conseguir autenticar ele manda para o localStorage
        if(retorno.ok){
            usuario = await retorno.json()
            localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario))
            console.log(usuario)
        }
        return retorno
        // se nao, tras a mensagem de erro
    }catch(erro){
        return erro
    }
}

//deslogando
export const singOut = () => {
    localStorage.removeItem(TOKEN_KEY)
}

//logando em uma conta já existente
export const isSignedIn = () => {
    //transformando em string
    const usuario = localStorage.getItem(TOKEN_KEY)
    //no retorno, transformando em objeto novamente
    return JSON.parse(usuario)
}

//ligando o usuario ao token
export const getToken = () => {
    const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY))

    console.log(usuario.token);
    return usuario.token
}