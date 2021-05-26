import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './delete.css';
import api from '../../services/services';

class DeletarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            redirect: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({ usuario: response.data });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Usuario</legend>
                    <div className="usuario-delete">
                        <h2>Nome: {this.state.usuario.nome}</h2>
                        <p> Tem certeza que deseja deletar este Registro!</p>

                        <button onClick={this.handleClick} id="btnDelete"> Remover </button>
                 

                        <Link to={'/'} id="linkDelete"> Voltar </Link>
                    </div>
                </fieldset>
            )
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3001/sistema/usuarios/${id}`, {
            method: "delete"
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true })
                }
            })

        event.preventDefault();
    }
}

export default DeletarUsuario;