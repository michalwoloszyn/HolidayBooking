import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function Login({ extendedHeader, setExtendedHeader }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post('/login', { email, password });
      setUser(data);
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }

  // if (redirect) {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, '10');

  //   return <Navigate to={'/'} />;
  // }

  return (
    <div
      onMouseOver={() => setExtendedHeader(false)}
      className='mt-4 grow flex items-center justify-around '
    >
      <div className='mb-64 border shadow-lg rounded-2xl p-10'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form
          className='max-w-2xl  flex flex-col gap-1 '
          onSubmit={handleLoginSubmit}
          action=''
        >
          <label>
            E-mail:
            <input
              className='p-1'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              required
            ></input>
          </label>
          <label>
            Password:
            <input
              className='p-1'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              required
            ></input>
          </label>

          <button className='primary p-2 w-1/2 mx-auto mt-2'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?
            <Link className='underline pl-1' to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
