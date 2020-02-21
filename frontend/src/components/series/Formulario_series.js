import React, { Component } from 'react';
import PubSub from 'pubsub-js'

class FormularioSeries extends Component {

    constructor(){
        super()
        this.stateInicial = {
            nome: '',
            lancamento: '',
            temporadas: '',
            sinopse: ''
        }
        this.state = this.stateInicial

        PubSub.subscribe('editing',(msg,serie) => {
            // console.log(msg + '---' + serie)
            this.setState(serie)
		})

    }

    inputHandler = (e) => {
        const {name, value} = e.target;
    
        this.setState({[name]: value});
      }

      enviaDados =(e) => {
          e.preventDefault();
          this.props.enviaDados(this.state)
          this.setState(this.stateInicial)
          delete this.state.id
      }

    render () {
        return (
            <div className="card text-white bg-dark">
                <div className="card-header">
                    Cadastro de Series
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={this.enviaDados}>
                        <div className="form-group">
                            <label htmlFor='nome'>Nome</label>
                            <input type="text" id='nome' name='nome' 
                                value={this.state.nome} 
                                onChange={this.inputHandler} 
                                className='form-control'/>
                            <label htmlFor='lancamento'>Ano de lançamento</label>
                            <input type="text" id='lancamento' name='lancamento' 
                                value={this.state.lancamento} 
                                onChange={this.inputHandler} 
                                className='form-control'/>
                            <label htmlFor='temporadas'>Temporadas</label>
                            <input type="text" id='temporadas' name='temporadas' 
                                value={this.state.temporadas} 
                                onChange={this.inputHandler} 
                                className='form-control'/>
                            <label htmlFor='sinopse'>Sinopse</label>
                            <textarea id='sinopse' name='sinopse' 
                                value={this.state.sinopse} 
                                onChange={this.inputHandler} 
                                className='form-control'></textarea>
                            <button type="submit" className='btn btn-success form-control mt-4'>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default FormularioSeries;