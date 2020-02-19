import React, { Component } from 'react';
//cada rota tem um Route. Router é onde vamos envolver todo o nosso codigo
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
//importando nossos arquivos de páginas ou estilização
import BoxSeries from './components/series/Box_series';
import Home from './components/Home';
import Autores from './components/Autores';
import Navbar from './components/Nav_bar'


const NotFound = () => {
  return(
    <div>
      <h1>Página não encontrada</h1>
    </div>
  )
}

class App extends Component {
  
  render(){
    return( 
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route path='/series' component={BoxSeries}/>
            <Route path='/autores' component={Autores}/>
            <Route exact path='/' component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
      
    )
  }
}
  
export default App;

// //componente do react
{/* <div className="App"> */}

/* <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
        Hello ReactJS
      </header> */

      //para mostrar o processo de criação
  // componentWillMount(){
  //   console.log('estou sendo montado')
  // }


  // console.log('Estou sendo renderizado na tela')
  //o retorno (sendo ele um xml/html) é transhtmlFormado em js

  // <Router>
  //       <div>
  //         <Navbar/>
  //         <Switch>
  //           <Route path='/series'>
  //             <BoxSeries/>
  //           </Route>
  //           <Route path='/autores'>
  //             <Autores/>
  //           </Route>
  //           <Route path='/'>
  //             <Home/>
  //           </Route>
  //         </Switch>
  //       </div>
  //     </Router>