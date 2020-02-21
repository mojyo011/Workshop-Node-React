import React, { Component } from 'react';
import TabelaSeries from './Tabela_series';
import FormularioSeries from './Formulario_series';
import { getToken } from '../../services/auth-service'
import { listar, 
  atualizar, 
  inserir, 
  remover } from '../../services/series-service'

class BoxSeries extends Component {

    //construtor
    constructor(){
        super()
        this.state = {
            series: []
        }
    }

  async componentDidMount(){
  try{
    const retorno = await listar()
    const series = await retorno.json()
    this.setState({series: series})
  }catch(erro){
    console.log(erro)
  }
    
    
  }

  enviaDados = async (serie) => {
    try {
      let retorno = ''
      //se já tiver um id, ele irá atualizar a série
      if(serie.id) retorno = await atualizar(serie)
      //se não, insere uma nova
      else retorno = await inserir(serie)
      if (retorno.status === 201) {
        return this.setState({
          series: [...this.state.series, serie],
          serie: this.novaSerie
        })
      }
      if (retorno.status === 200) {
        this.setState({
          series: this.state.series.map(s => s.id == serie.id ? serie : s),
          serie: this.novaSerie
        })
      }

    } catch (erro) {
      console.log(erro)
    }

  }

  deleta = async (id) => {
    const seriesAtual = this.state.series
    const retorno = await remover(id)
    if (retorno.status === 204) {
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

//TESTE
    // console.log('Já estou pronto')
    // //sempre que a gente altera o estado, o react irá chamar o render, assim renderizando a página
    // this.setState({lista: [{nome: 'rei leão', lancamento: '1998'}]})