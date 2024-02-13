/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { signUp } from './authSlice';
import './styles/auth.scss';

function SignUpPage(): JSX.Element {
  const [name, setName] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [password, setPasssword] = useState('');
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [rpassword, setRpassword] = useState('');
  // const [rpasswordDirty, setRpasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Поле имя не может быть пустым');
  const [emailError, setEmailError] = useState('Поле почты обязательно');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [rpasswordError, setRpasswordError] = useState('Пароли не совпадают');
  const [img, setImg] = useState('');
  const [isMaster, setIsMaster] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  const nameHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    setName(e.target.value);
    if (e.target.value[0] === e.target.value[0].toLowerCase()) {
      setNameError('Имя должно начинаться с заглавной буквы');
    } else {
      setNameError('');
    }
  };

  const emailHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    setEmail(e.target.value);
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setEmailError('некорректный емейл');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    setPassword(e.target.value);
    if (e.target.value.length < 4) {
      setPasswordError('Пароль не может быть короче 4 символов');
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>RegPage</h1>
      <form
        className="reg-box"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signUp({ name, email, password, rpassword, img, isMaster })).catch(console.log);
          navigate('/');
        }}
      >
        {nameDirty && nameError && <div>{nameError}</div>}
        <input
          name="name"
          value={name}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            setName(e.target.value);
            nameHandler(e);
          }}
          type="text"
          placeholder="name"
        />
        {emailDirty && emailError && <div>{emailError}</div>}
        <input
          name="email"
          value={email}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            emailHandler(e);
          }}
          type="text"
          placeholder="email"
        />
        {passwordDirty && passwordError && <div>{passwordError}</div>}
        <input
          name="password"
          value={password}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            setPasssword(e.target.value);
            passwordHandler(e);
          }}
          type="text"
          placeholder="password"
        />
        <input
          name="rpassword"
          value={rpassword}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            setRpassword(e.target.value);
            rpasswordHandler(e);
          }}
          type="text"
          placeholder="repeat password"
        />
        <input
          name="img"
          value={img}
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            setImg(e.target.value);
          }}
          type="text"
          placeholder="img"
        />
        <div className="checkbox-master">
          {' '}
          <input
            name="taskStatus"
            id="taskStatus"
            type="checkbox"
            onChange={() => setIsMaster(true)}
          />
          Master
        </div>
        <button disabled={!formValid} type="submit">
          Зарегаться
        </button>
        <div className="authRedirect">
          У меня есть аккаунт
          <NavLink className="nav__link" to="/sign-in">
            Войти
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
