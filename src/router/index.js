import React from 'react';
import '../App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Categorias from '../pages/Categorias';
import SubCategorias from '../pages/SubCategorias';
import Comercios from '../components/ComercioAdherido';
import Usuarios from '../components/Usuario';
import Geograficos from '../pages/Geograficos';
import Navbar from '../components/shared/Navbar';

//Editar
import EditarUsuario from '../components/Usuario/EditarUsuario';
import EditarComercio from '../components/ComercioAdherido/EditarComercio';

const RouterDom = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/categorias' exact component={Categorias} />
          <Route path='/subcategorias' exact component={SubCategorias} />
          <Route path='/comercios' exact component={Comercios} />
          <Route path='/comercios/editar/:id' exact component={EditarComercio} />
          <Route path='/usuarios' exact component={Usuarios} />
          <Route path="/usuario/editar/:id" exact component={ EditarUsuario } />
          <Route path='/geograficos' exact component={Geograficos} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default RouterDom;