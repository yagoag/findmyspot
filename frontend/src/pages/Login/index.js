import React, { useState } from 'react';
import api from '../../services/api';

function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();

    const res = await api.post('/sessions', { email });
    const { _id } = res.data;
    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Offer <strong>spots</strong> for programmers and find the best{' '}
        <strong>talents</strong> for your company
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Your best e-mail"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
