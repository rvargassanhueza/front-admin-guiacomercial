import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import SubCategorias from './pages/SubCategorias';

import Comercios from './pages/Comercio';
import Usuarios from './pages/Usuarios';
import Geograficos from './pages/Geograficos';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/categorias' component={Categorias} />
          <Route path='/subcategorias' component={SubCategorias} />
          <Route path='/comercios' component={Comercios} />
          <Route path='/usuarios' component={Usuarios} />
          <Route path='/geograficos' component={Geograficos} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
