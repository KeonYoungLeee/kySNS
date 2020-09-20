import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = (event) => { setEmail(event.target.value); }
  const onChangePassword = (event) => { setPassword(event.target.value); }
  const onSubmit = (event) => {
    event.preventDefault();
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
          value="LogIn" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
