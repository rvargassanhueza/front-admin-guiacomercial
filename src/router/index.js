import React from 'react';
import '../App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Categorias from '../pages/Categorias';
import SubCategorias from '../pages/SubCategorias';
import Comercios from '../components/ComercioAdherido';
import Usuarios from '../components/Usuario';
import Geograficos from '../pages/Geograficos';
import Navbar from '../components/shared/Navbar';

//Editar Usuario
import FormEditarUsuario from '../components/Usuario/FormEditarUsuario';

const RouterDom = () => {
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
          <Route path="/usuario/editar/:id" component={ FormEditarUsuario } />
          <Route path='/geograficos' component={Geograficos} />
        </Switch>
      </Router>
    </>
  );
}

export default RouterDom;