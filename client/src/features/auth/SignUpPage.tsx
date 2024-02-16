import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
  clearError,
  setEmailError,
  setPasswordErrorLength,
  setPasswordMatchError,
  signUp,
  validateEmailFormat,
  validatePassword,
  validatePasswordsMatch,
} from './authSlice';
import './styles/auth.scss';

import { type RootState, useAppDispatch } from '../../redux/store';

function SignUpPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [img, setImg] = useState<FileList | null>(null);
  const [isMaster, setIsMaster] = useState(false);
  const error = useSelector((store: RootState) => store.auth.error);
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordErrorNew = validatePassword(newPassword);
    dispatch(setPasswordErrorLength(passwordErrorNew));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRpassword = e.target.value;
    setRpassword(newRpassword);
    const passwordsMatchError = validatePasswordsMatch(password, newRpassword);
    setPasswordMatchError(passwordsMatchError);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailError = validateEmailFormat(newEmail);
    dispatch(setEmailError(emailError));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImg(files);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('rpassword', rpassword);
    if (img) {
      Array.from(img).forEach((image) => {
        formData.append('img', image);
      });
    }
    formData.append('isMaster', String(isMaster));
    console.log(formData);
    dispatch(signUp(formData)).catch(console.log);
  };

  return (
    <div className="container">
      <div className="form_area">
        <p className="title">Регистрация</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <p className="sub_title">Ваше имя</p>
            <input
              className="form_style"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="name"
              required
            />
          </div>
          <div className="form_group">
            <p className="sub_title">Email</p>
            <input
              className="form_style"
              name="email"
              value={email}
              onChange={handleEmailChange}
              type="text"
              placeholder="email"
              required
            />
          </div>
          <div className="form_group">
            <p className="sub_title">Пароль</p>
            <input
              className="form_style"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="password"
              required
              minLength={8}
            />
          </div>
          <div className="form_group">
            <p className="sub_title">Повторите пароль</p>
            <input
              className="form_style"
              name="rpassword"
              value={rpassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="repeat password"
              required
              minLength={8}
            />
          </div>
          <div className="form_group">
            <input
              className="form_style"
              name="img"
              onChange={(e) => {
                handleFileChange(e);
              }}
              type="file"
            />
          </div>
          <div className="checkbox-master">
            <input
              name="taskStatus"
              id="taskStatus"
              type="checkbox"
              className="form_style-master"
              value={String(isMaster)}
              onChange={() => setIsMaster(true)}
            />
            <p> Я мастер</p>
          </div>
          <div>
            <button type="submit" className="auth-btn">
              в IT!
            </button>
            <div className="footer-sign-up">
              <p className="p-account">У меня есть аккаунт</p>
              <NavLink className="auth-nav-link-2" to="/sign-in">
                Войти!
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
