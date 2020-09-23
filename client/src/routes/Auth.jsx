import React, { useState, useCallback } from 'react';
import { authService, firebaseInstance } from '../fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  
  const onChangeEmail = (event) => { 
    setEmail(event.target.value); 
  };
  const onChangePassword = (event) => { 
    setPassword(event.target.value); 
  };
  
  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }, [email, password, error]);

  const togleAccout = () => {
    setNewAccount(prev => !prev);
  };
  
  const onSocialClick = async (event) => {
    const {
      target: { name }, 
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit} >
        <input 
          type="text"
          name="email"
          placeholder="Email" 
          required 
          value={email} 
          onChange={onChangeEmail} />
        <input 
          type="password"
          name="password"
          placeholder="password" 
          required 
          value={password} 
          onChange={onChangePassword} />
        <input type="submit" name="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={togleAccout}>
        {newAccount ? "Sign In": "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
