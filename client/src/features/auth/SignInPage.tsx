import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { signIn } from './authSlice';

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>AuthPage</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signIn({ email, password })).catch(console.log);
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
        <input type="checkbox" checked={} onChange={} /> Master;
        <input type="checkbox" checked={} onChange={} /> Guest;
      </form>
    </div>
  );
}

export default SignInPage;
