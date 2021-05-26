import React from 'react';
import Header from './components/header/header';
import Routes from './routes';
import Rodape from './components/rodape/rodape';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <br />
      <Rodape />
    </div>
  );
}

export default App;
