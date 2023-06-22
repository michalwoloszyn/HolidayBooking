import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Account({ extendedHeader, setExtendedHeader }) {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div onMouseOver={() => setExtendedHeader(false)}>
      <nav className='w-full flex mt-4 md:gap-2 justify-center'>
        <Link
          className='inline-flex text-sm md:text-lg  gap-1 py-2 px-2 md:px-6 bg-primary text-white rounded-full'
          to={'/account'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
          Profile
        </Link>
        <Link
          className='inline-flex text-sm md:text-lg gap-1 py-2 px-2 md:px-6'
          to={'/account/bookings'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          Bookings
        </Link>
        <Link
          className='inline-flex text-sm md:text-lg gap-1 py-2 px-2 md:px-6'
          to={'/account/places'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          Accomodations
        </Link>
      </nav>

      <div className='text-center max-w-lg mx-auto flex flex-col items-center gap-4 mt-10 border rounded-2xl pt-6'>
        <h2 className='text-2xl font-medium'>Hi {user.name}!</h2>
        <h3 className='text-xl'>E-mail: {user.email}</h3>
        <button onClick={logout} className='primary max-w-sm mb-4 py-2 px-6'>
          Logout
        </button>
      </div>
    </div>
  );
}
