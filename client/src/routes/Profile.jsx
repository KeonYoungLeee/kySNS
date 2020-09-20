import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../fbase';

const Profile = () => {
  
  const history = useHistory();

  const onClickLogOut = () => {
    authService.signOut();
    history.push('/');
  }
  
  return (
    <>
      <button onClick={onClickLogOut} >LogOut</button>
    </>
  );
};

export default Profile;
