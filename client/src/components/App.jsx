import React, { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import {authService} from '../fbase'

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [init, isLoggedIn])
  
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} />: `Initalizing....` }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer> 
    </>
  ); 
};
export default App;
