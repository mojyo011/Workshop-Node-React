import React, { Component } from 'react';
import TabelaSeries from './Tabela_series';
import FormularioSeries from './Formulario_series';

class BoxSeries extends Component {

    //construtor
    constructor(){
        super()
        this.state = {
            series: []
        }
    }

  async componentDidMount(){
    let resposta = await fetch('http://localhost:3000/series') 
    const series = await resposta.json()
    console.log(series)
    this.setState({series: series})
    
    //TESTE
    // console.log('Já estou pronto')
    // //sempre que a gente altera o estado, o react irá chamar o render, assim renderizando a página
    // this.setState({lista: [{nome: 'rei leão', lancamento: '1998'}]})
  }

  enviaDados = async (serie) => {
    console.log('enviando dados....')
    // let { serie } = this.state
    const method = serie.id ? 'PUT' : 'POST'
    const params = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serie)
    }
    const urlParam = serie.id || ''
    try {
      const retorno =
        await fetch('http://localhost:3000/series/' + urlParam, params)
      console.log('enviado com sucesso')
      serie = await retorno.json()
      if (retorno.status === 201) {
        return this.setState({
          series: [...this.state.series, serie],
          serie: this.novaSerie
        })
      }
      if(retorno.status === 200){
        console.log(serie)
        this.setState({
          series: this.state.series.map(s => s.id == serie.id ? serie : s ),
          serie: this.novaSerie
        })
        console.log(this.state.series)
      }
      
    } catch (erro) {
      console.log(erro)
    }

  }

    deleta = async (id) => {
        const seriesAtual = this.state.series
        const params = {
            method: 'DELETE',
        }
        const retorno = await 
            fetch('http://localhost:3000/series/' + id,params)
        if(retorno.status === 204){
            this.setState({
                series: seriesAtual.filter((serie) => {
                    return serie.id !== id
                })
            })
        }
    }
    
    render() {
        return (
            //container-fluid - ele deixa o conteudo de adaptar ao tamnho da tela do navegador
            <div className="container"> 
                <div className="row">
                    {/* colocando uma tabela com 4 colunas */}
                    <div className="col-md-4">
                        <FormularioSeries enviaDados={this.enviaDados}/>
                    </div>
                    <div className="col-md-8">
                        <TabelaSeries series={this.state.series} deleta={this.deleta}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BoxSeries;