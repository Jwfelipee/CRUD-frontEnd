import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './details.css'
import {Container} from 'reactstrap';


export default class Usuario extends Component {
    state = {
        usuario: {
            nome: "",
            matricula: 0,
            ativo: "",
            endereco: {
                cidade: "",
                estado: ""
            }
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({ usuario: response.data });

    }

    render() {
        const { usuario } = this.state;

        if(usuario.ativo) {
            usuario.ativo = "Usuario Ativo!";
        }else{
            usuario.ativo = "Usuario Inativo!";
        }

        return (
            <Container fluid className="div1">
            <div className="usuario-info">
                <h1>Nome: {usuario.nome}</h1>
                <h1>Matricula Nº: {usuario.matricula}</h1>
                <h1>Status: {usuario.ativo}</h1>
                <h1>Cidade: {usuario.endereco.cidade}</h1>
                <h1>Estado: {usuario.endereco.estado}</h1>
                <br/>
                <Link to={`/`} id="link1">Voltar a Home page</Link>
                <Link to={`/EditarUsuario/${usuario._id}`} id="link2">Editar</Link>
                <Link to={`/DeletarUsuario/${usuario._id}`} id="link3">Deletar</Link>
            </div>
            </Container>
        )
    }
}