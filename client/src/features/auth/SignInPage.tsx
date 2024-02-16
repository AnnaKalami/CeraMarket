import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import { clearError, signIn } from './authSlice';
import './styles/auth.scss';

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((store: RootState) => store.auth.auth);
  const error = useSelector((store: RootState) => store.auth.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({ email, password })).catch(console.log);
  };

  return (
    <div className="container">
      <div className="form_area">
        <p className="title">Добро пожаловать!</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <p className="sub_title">Email</p>
            <input
              className="form_style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="email"
              required
            />
          </div>
          <div className="form_group">
            <p className="sub_title">Пароль</p>
            <input
              className="form_style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              required
            />
          </div>
          <div>
            <button className="auth-btn" type="submit">
              в IT!
            </button>
            <p>
              Нет аккаунта?
              <NavLink className="auth-nav-link" to="/sign-up">
                Регистрация
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
