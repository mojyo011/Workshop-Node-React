import { getToken } from './auth-service'

const URL = 'http://localhost:3000/'

//METODO PARA REQUISIÇÕES PRIVADAS
// resource -- será nossa requisição sendo ele o nosso ('series/')
// se nao receber nada ele será vazio
//doRequest - passar 4 parametros, os 2 primeiros são obrigatorios e necessarios sendo eles o metodo e a requisição
export const doRequest = (resource, method, dados = '', urlParam = '') => {
	const params = {
		method: method,
		headers: {
			Accept: 'application/json',
            'Content-Type': 'application/json',
            //barear deve ter um espaço, pois é assim que separamos ele do token
			authorization: 'Bearer ' + getToken()
		},
    }
    //se tiver dados, os parametros irão receber os dados, caso nao tenha, ficará e, branco
    // dados ? params.body = dados : ''

    // se o metodo que vier nao for nenhum desses, incluimos o body (sendo ele o que recebe/esta com os dados)
    if(!['GET','DELETE'].includes(method)) params.body = JSON.stringify(dados)
	return fetch(URL + resource + urlParam, params)
}

//METODO PARA REQUISIÇÕES PUBLICAS
export const doPublicRequest = (resource, method, dados = '', urlParam = '') => {
	const params = {
		method: method,
		headers: {
			Accept: 'application/json',
            'Content-Type': 'application/json',
		},
    }
    //se tiver dados, os parametros irão receber os dados, caso nao tenha, ficará e, branco
    // dados ? params.body = dados : ''

    // se o metodo que vier nao for nenhum desses, incluimos o body (sendo ele o que recebe/esta com os dados)
    if(!['GET','DELETE'].includes(method)) params.body = JSON.stringify(dados)
	return fetch(URL + resource + urlParam, params)
}