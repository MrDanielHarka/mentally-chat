import { useState } from 'react';

import './SignIn.css';
import { useNavigate } from 'react-router';
import { useAuth } from '../../state/auth/authReducer';

export function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.login({ email: state.email, password: state.password }).then(() => {
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mail:
        <input type="text" name="email" value={state.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={state.password} onChange={handleChange} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
