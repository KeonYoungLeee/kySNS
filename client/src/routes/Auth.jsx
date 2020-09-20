import React, { useState } from 'react';
import { authService } from './../firebaseinstance';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const onChangeEmail = (event) => { setEmail(event.target.value); }
  const onChangePassword = (event) => { setPassword(event.target.value); }
  const onSubmit = async (event) => {
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
      console.error(error);
    }
  }
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
        <input 
          type="submit"
          name="submit"
          value={newAccount ? "Create Account" : "Log In"} />
  
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
