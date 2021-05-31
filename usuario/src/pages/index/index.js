import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './index.css';
import {Container} from 'reactstrap';


export default class Usuarios extends Component {
    state = {
        usuarios: [],
        usuariosInfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadUsuarios();
    }

    loadUsuarios = async (page = 1) => {
        const response = await api.get(`/usuarios?page=${page}`)
        const { docs, ...usuariosInfo } = response.data;
        this.setState({ usuarios: docs, usuariosInfo, page });
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }

    homePage = () => {
        const { page } = this.state;
        if (page === 1) return;

        const pageNumber = 1;
        this.loadUsuarios(pageNumber);
    }

    nextPage = () => {
        const { page, usuariosInfo } = this.state;
        if (page === usuariosInfo.pages) return;

        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }


    render() {
        const { usuariosInfo, page } = this.state;
        return (
            <Container fluid className="div2">
            <div className="usuario-list">
                <a href="/CriarUsuarios">
                    <div className='actions2'>
                     <button id="btn4">Criar um Usuario</button>
                </div>
                </a>
                {this.state.usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong>Nome: {usuario.nome}</strong>
                        <p>Matricula Nº: {usuario.matricula}</p>
                        <p> <Link to={`/usuarios/${usuario._id}`}><h1>Acessar</h1></Link> </p>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={page === 1} onClick={this.prevPage} id="btn1">Anterior</button>
                    <button disabled={page === 1 || page === 2} onClick={this.homePage} id="btn3">Home</button>
                    <button disabled={page === usuariosInfo.pages} onClick={this.nextPage} id="btn2">Proximo</button>
                </div>
            </div>
            </Container>
        )
    }
}