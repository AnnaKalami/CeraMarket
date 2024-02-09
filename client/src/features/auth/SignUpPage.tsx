import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { signUp } from './authSlice';

function SignUpPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const [rpassword, setRpasssword] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>RegPage</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signUp({ name, email, password, rpassword, img })).catch(console.log);
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
        {/* <input name="taskStatus" id="taskStatus" type="checkbox" />
        <input name="taskStatus" id="taskStatus" type="checkbox" /> */}
        <button type="submit">Зарегаться</button>
      </form>
    </div>
  );
}

export default SignUpPage;