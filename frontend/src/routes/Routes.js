import React, { Component } from 'react';
//cada rota tem um Route. Router é onde vamos envolver todo o nosso codigo
import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Redirect
} from 'react-router-dom';
import BoxSeries from '../components/series/Box_series'
import Autores from '../components/Autores'
import Home from '../components/Home'
import Navbar from '../components/Nav_bar'
import Login from '../components/Login'
import { isSignedIn } from '../services/auth-service';

const NotFound = () => {
    return(
      <div>
        <h1>Página não encontrada</h1>
      </div>
    )
}

//criando uma rota privada / renomeando component para poder usa-lo como tag (por isso o C)
//...rest -- passando tudo o que esta guardado no props
const PrivateRoutes = ({component: Component, ...rest}) => {
    return(
        //pegando o que esta no rest
        <Route {...rest}
            render={props =>
                //se estiver logado entra na rota privada, sendo ela as series
                isSignedIn() ? (
                    <div>
                        <Navbar />
                        <Component {...props}/>
                    </div>
                ) : (
                    // se nao redireciona para a rota de login
                    <Redirect to={{ pathname: '/login', 
                        state: {from: props.location}
                    }}/>
                )
            }
        />
    )
}

const Routes = () => (
    // todas as rotas de acesso devem ser privadas, menos a de login e de erro 404
    <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoutes exact path='/' component={Home}/>
			<PrivateRoutes path='/series' component={BoxSeries} />
            <PrivateRoutes path='/autores' component={Autores}/>
            <Route component={NotFound}/>
          </Switch>
    </Router>
)

export default Routes;