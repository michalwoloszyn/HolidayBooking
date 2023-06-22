import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register({ extendedHeader, setExtendedHeader }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in!');
    } catch (e) {
      alert('Registration failed. Try again later.');
    }
  }

  return (
    <div
      onMouseOver={() => setExtendedHeader(false)}
      className='mt-4 grow flex items-center justify-around'
    >
      <div className='mb-64 border shadow-lg rounded-2xl p-10'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form
          className='max-w-2xl mx-auto flex flex-col gap-1'
          onSubmit={registerUser}
          action=''
        >
          <label>
            Name:
            <input
              className='p-1'
              required
              type='text'
              placeholder='John Doe'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </label>
          <label>
            E-mail:
            <input
              className='p-1'
              required
              type='email'
              placeholder='your@email.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Password:
            <input
              className='p-1'
              required
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>

          <button className='primary py-2 w-1/2 mx-auto mt-2'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?{' '}
            <Link className='underline text-black' to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
