import { doRequest } from './baseapi-service'

const RESOURCE = 'series/'

//função para listar as series (sendo exportada no momento em que é criada)
export const listar = () => {
    //retorna o que o metodo GET trouxer
    return doRequest(RESOURCE, 'GET')
}

//função para inserir as series (sendo exportada no momento em que é criada)
export const inserir = (serie) => {
    //retorna a serie após ser inserida
    return doRequest(RESOURCE, 'POST', serie)
}

//função para remover as series (sendo exportada no momento em que é criada)
export const remover = (id) => {
    //retorna a exxclusão a séria atraves do id
    return doRequest(RESOURCE, 'DELETE', '', id)
}

//função para atualizar as series (sendo exportada no momento em que é criada)
export const atualizar = (serie) => {
    //
    return doRequest(RESOURCE, 'PUT', serie, serie.id)
}