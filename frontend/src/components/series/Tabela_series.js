import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import './Tabela_series.css'

const ListaSeries = (props) => {

    if(props.series.erro){
		return <h1>{props.series.erro}</h1>
	}

    return (
        <div className='card-body card-body-flex'>
            {props.series.map(serie => {
                return(
                    <div className='card card-serie'  key={serie.id}>
                        <div className='card-header'>
                            <h5 className="card-title">{serie.nome}</h5>
							<h6 className="card-title text-muted mb-0">
			                    {serie.lancamento}
							</h6>
                        </div>
                        <div className='card-body'>
                            <img src='/logo192.png' className="card-img"/>
                        </div>
                        <div className='card-footer'>
                            {serie.temporadas} 
							{serie.temporadas > 1 ? ' temporadas' : ' temporada'}
							<br />
                            <a href="#" 
                            // trazendo a modal na hora de clicar em ver mais
                                data-toggle="modal" 
								data-target="#exampleModalCenter"
                                onClick={() =>{
                                    PubSub.publish('detail',serie)
                                }}
                                >Ver mais...</a> <br/> <br/>
                            <div className="text-center mt-1">
                                <button className="btn btn-outline-danger btn-sm mr-2 p-1" 
                                onClick={ () => {
                                    if(window.confirm('Confirma a exclusão?'))
                                    props.deleta(serie.id)
                                }}>Deleta</button>
                                <button className="btn btn-outline-warning btn-sm p-1" 
                                    onClick={() => (
                                        PubSub.publish('editing',serie)
                                    ) 
                                }>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })} 
        </div>     
    )
}

class TabelaSeries extends Component {

    //criando um construtor
    constructor(){
        super()
        //iniciando o serieDetalhe vazio
        this.state = {
            serieDetalhe: '',
        }
        //inscrevendo uma chave do pubsub e passando com ela a mensagem e a serie
        PubSub.subscribe('detail', (msg,serie) => {
            //assim enviando o estado da serie e os seus detalhes(dados)
            this.setState({serieDetalhe: serie})
        })
    }

    render() {

        //criando uma função que está recebendo o estado dela mesma
        const serieDetalhe = this.state.serieDetalhe
        
        const { series, deleta } = this.props

        return(
            //text-white bg-dark - deixa o texto branco e a tabela dark
            <div className='card'>
				<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
                                {/* passando o nome da serie atraves do serieDetalhe.oNome */}
                                <h5 className="modal-title" 
                                    id="exampleModalLongTitle">
                                    {this.state.serieDetalhe.nome}
                                </h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
                            {/* trazendo os dados para a modal atraveas do serieDetalhe.oNomeDosCampos */}
							<div className="modal-body">
                                <img src="/logo192.png" className="card"/>
                                {serieDetalhe.temporadas}
                                {/* caso temporadas seja menor que um, ele irá renomear para o plural */}
                                {serieDetalhe.temporadas > 1 ? 'temporadas': 'temporada'}
                                <br/>
                                {serieDetalhe.lancamento}
      				        </div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
				<div className="card-header ">
					<h5 className="text-center">Lista de Series</h5>
				</div>

				<ListaSeries series={series} deleta={deleta} />
			</div>
        )
    }
}
export default TabelaSeries;



// <tr key={serie.id}>
{/* <td>{serie.nome}</td>
<td>{serie.lancamento}</td>
<td>{serie.temporadas}</td>
<td>{serie.sinopse}</td>
</tr> */}