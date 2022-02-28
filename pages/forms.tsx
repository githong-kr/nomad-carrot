import { NextPage } from 'next';
import React, { useState } from 'react';

// Less Code
// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Don't deal with events
// Easier Inputs

const Forms: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setEmail(value);
  };

  const onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setPassword(value);
  };

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col space-y-5 mt-5">
        <input
          onChange={onEmailChange}
          value={email}
          type="email"
          placeholder="email"
          required
        />
        <input
          onChange={onPasswordChange}
          value={password}
          type="password"
          placeholder="pw"
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Forms;
