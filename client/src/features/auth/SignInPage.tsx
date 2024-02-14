import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { setEmailErrorAuth, setPasswordErrorAuth, signIn } from './authSlice';
import './styles/auth.scss';

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((store: RootState) => store.auth.auth);
  const errorNew = useSelector((store: RootState) => store.auth.error);
  const passwordError = useSelector((store: RootState) => store.auth.passwordError);
  const emailError = useSelector((store: RootState) => store.auth.emailError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({ email, password })).catch(console.log);
  };

  return (
    <div className="sign-in-container">
      <h1>AuthPage</h1>
      {errorNew && <div>{errorNew}</div>}
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        <button type="submit">login</button>
        <div className="authRedirect">
          Нет аккаунта?
          <NavLink className="nav__link" to="/sign-up">
            Регистрация
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
