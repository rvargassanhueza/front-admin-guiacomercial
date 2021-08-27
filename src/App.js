import React from 'react';
import './App.css';

//Context
import UserProvider from './context/usuarios/UserState';
import ComercioProvider from './context/comercioAdherido/ComercioState';

//Routing
import RouterDom from './router';

const App = () => {
  return (
    <UserProvider>
      <ComercioProvider>
        <RouterDom /> 
      </ComercioProvider>
    </UserProvider>
  );
}

export default App;
