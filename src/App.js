import React from 'react';
import './App.css';

//Context
import UserProvider from './context/UserContext';

//Routing
import RouterDom from './router';

const App = () => {
  return (
    <>
      <UserProvider>
        <RouterDom />
      </UserProvider>
    </>
  );
}

export default App;
