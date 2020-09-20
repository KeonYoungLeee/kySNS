import React, { useState } from 'react';
import AppRouter from './components/AppRouter';
import {authService} from './firebaseinstance'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer> 
    </>
  ); 
};
export default App;