import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { signUp } from './authSlice';
import './styles/auth.scss';


function SignUpPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const [rpassword, setRpasssword] = useState('');
  const [img, setImg] = useState('');
  const [isMaster, setIsMaster] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>RegPage</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signUp({ name, email, password, rpassword, img, isMaster })).catch(console.log);
        }}
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="name"
        />
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
        <input
          value={rpassword}
          onChange={(e) => {
            setRpasssword(e.target.value);
          }}
          type="text"
          placeholder="repeat password"
        />
        <input
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
          type="text"
          placeholder="img"
        />
        <input
          name="taskStatus"
          id="taskStatus"
          type="checkbox"
          onChange={() => setIsMaster(true)}
        />
        Master
        <button type="submit">Зарегаться</button>
        <div className='authRedirect'>
          У меня есть аккаунт
          <NavLink className="nav__link" to="/sign-in">Войти</NavLink>
          </div>    
      </form>
    </div>
  );
}

export default SignUpPage;
