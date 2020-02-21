import React, { Component } from 'react'
import './Login.css'
import { signIn } from '../services/auth-service'

// receber os componentes(ou parametros) via props
//função para mostrar na tela uma mensagem de erro caso o email ou senha colocados na hora do login sejam 
const MsgErro = (props) => {
	return props.mensagem ? (
		<div className="alert alert-danger">{props.mensagem}</div>
	) : ('')
}

export default class Login extends Component {

    // construtor
	constructor(){
        super()
        //criando os campos
		this.state = {
			email: '',
			senha: '',
			msgErro: ''
		}
	}

	inputHandler = (e) => {
		const {name, value } = e.target
		this.setState({ [name]: value})
	}

    //função para se logar
	signIn = async (e) => {
		try{
			e.preventDefault()
			const usuario = this.state
			delete usuario.msgErro
			
			// console.log(retorno)
			const retorno = await signIn(usuario)
			if(retorno.status === 400){
				const erro = await retorno.json()
				this.setState({msgErro: erro.erro})
			}

			//history -- historico de navegação do usuario
			//login com sucesso, manda para a pagina raiz(home)
			if(retorno.ok) this.props.history.push('/')

		}catch(e){
			console.log(e)
		}
	}

	render() {
		return (
			<div className="body">
				<form className="form-signin" onSubmit={this.signIn}>
					<img className="mb-4" src="/logo192.png" alt="" width="72" height="72"></img>
					<h1 className="h3 mb-3 font-weight-normal">Por favor, faça login</h1>
					<MsgErro mensagem={this.state.msgErro}/>
					<label for="inputEmail" className="sr-only">E-mail</label>
					<input type="email" 
						id="email"
						name="email" 
						className="form-control" 
						placeholder="Endereço de e-mail" 
						required autofocus 
						onChange={this.inputHandler}/>
					<label for="inputPassword" className="sr-only">Senha</label>
					<input type="password" 
						id="senha"
						name="senha" 
						className="form-control" 
						placeholder="Sua senha" required 
						onChange={this.inputHandler}/>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
				</form>
			</div>
		)
	}

}