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
  const passwordError = useSelector((store: RootState) => store.auth.passwordError);
  const emailError = useSelector((store: RootState) => store.auth.emailError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      dispatch(setEmailErrorAuth('Введите адрес электронной почты'));
      return;
    }
    if (!emailRegex.test(email)) {
      dispatch(setEmailErrorAuth('Неправильный адрес электронной почты'));
      return;
    }
    if (!password) {
      dispatch(setPasswordErrorAuth('Без пароля никак'));
      return;
    }
    if (password.length < 3) {
      dispatch(setPasswordErrorAuth('Пароль меньше 3 символов - не пароль'));
      return;
    }
    dispatch(setPasswordErrorAuth(''));
    dispatch(setEmailErrorAuth(''));
    dispatch(signIn({ email, password })).catch(console.log);
  };

  return (
    <div className="sign-in-container">
      <h1>AuthPage</h1>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        {emailError && <div className="email-error">{emailError}</div>}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        {passwordError && <div className="email-error">{passwordError}</div>}
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
