import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './index.css';

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
        const {page} = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }

    nextPage = () => {
        const {page, usuariosInfo} = this.state;
        if(page === usuariosInfo.pages) return;

        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }


    render() {
        // eslint-disable-next-line
        const { usuarios, usuariosInfo, page } = this.state;
        return (
            <div className="usuario-list">
                {this.state.usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong>{usuario.nome}</strong>
                        <p>{usuario.matricula}</p>
                        <p> <Link to={'/usuarios/${usuario._id)'}>Acessar</Link> </p>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page===usuariosInfo.pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
        )
    }
}