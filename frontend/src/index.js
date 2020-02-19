import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';

const IsSingedIn = false

//criando uma função index, pag de entrada
const Index = () => {
    //se ja possuir um login, manda para o app, onde esta correndo todo o nosso codigo
    if(IsSingedIn)
        return <App />
    // se nao tiver, manda pra pag de login
    else
        return <Login />    
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
