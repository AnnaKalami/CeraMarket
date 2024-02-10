import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { signIn } from './authSlice';
import './styles/auth.scss';


function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h1>AuthPage</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signIn({ email, password })).catch(console.log);
          navigate('/')
        }}
      >
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPasssword(e.target.value);
          }}
          type="text"
          placeholder="password"
        />
        <button type="submit">login</button>
        <div className='authRedirect'>
          Нет аккаунта?
          <NavLink className="nav__link" to="/sign-up">Регистрация</NavLink>
          </div>    
      </form>
    </div>
  );
}

export default SignInPage;
