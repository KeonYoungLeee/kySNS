import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import router from 'next/router';
import { SIGN_UP_REQUEST } from '../reducers/user';

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Signup = () => {
  const dispatch = useDispatch();
  const {isSigningUp, me, isSignUpSuccesFailure, signUpErrorReason} = useSelector(state => state.user);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false); 
  const [passwordError, setPasswordError] = useState(false); 
  const [termError, setTermError] = useState(false); 

  const [id, onChangeId] = useInput(''); 
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if ( password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      setTermError(true);
    }
    dispatch({
      type : SIGN_UP_REQUEST,
      data : {
        userId : id,
        password,
        nickname : nick, 
      }
    }); 
  }, [id, nick, password, passwordCheck, term]);
  
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password); 
    setPasswordCheck(e.target.value);
  }, [password]); 
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []); 


  useEffect(() => {
    if(me) {
      alert('ログインしたのでメインページ一覧に遷移します。');
      router.push('/')
    }
  }, [me && me.id]); 

  if (me) { 
    return null;
  }
  
  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding : 10}} >
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">ニックネーム</label>
          <br />
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </div>
        <div>
          <label htmlFor="user-password">パスワード</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">パスワードチェック</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
          { passwordError && <div style={{color : 'red'}}>パスワードが一致しません。</div> }
        </div>
        <div>
          <Checkbox name="user-term" defaultChecked={term} onChange={onChangeTerm}>確認</Checkbox>
          { termError && <div style={{color : 'red'}}>確認してください。</div> }
        </div>
        <div style={{ marginTop : 10}}>
          <Button type="primary" htmlType="submit" loading={isSigningUp} >新規登録</Button>
        </div>
        <div>
          {isSignUpSuccesFailure && <div>{signUpErrorReason}</div>}
        </div>
      </Form>
    </>
  );
};

export default Signup;