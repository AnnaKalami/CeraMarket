import React, { useState } from 'react';

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  return (
    <div>
      <h1>AuthPage</h1>
      <form>
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
      </form>
    </div>
  );
}

export default SignInPage;
