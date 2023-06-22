import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Places({ extendedHeader, setExtendedHeader }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div onMouseOver={() => setExtendedHeader(false)}>
      <nav className='w-full flex mt-4 gap-2 justify-center'>
        <Link
          className='inline-flex text-sm md:text-lg  gap-1 py-2 px-2 md:px-6 '
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
          className='inline-flex text-sm md:text-lg gap-1 py-2 px-2 md:px-6 '
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
          className='inline-flex text-sm md:text-lg gap-1 py-2 px-2 md:px-6 bg-primary text-white rounded-full'
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
      <div className=' mt-4 text-center'>
        <div className='flex flex-col gap-5 mt-5 items-center'>
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={place._id}
                key={place._id}
                className='cursor-pointer border shadow-xl flex rounded-2xl p-4 w-full md:w-9/12 lg:w-8/12 2xl:w-7/12 relative'
              >
                <div className='shrink-0'>
                  {place.photos.length > 0 && (
                    <img
                      className='md:w-64 md:h-64 w-32 h-32 object-cover'
                      src={
                        'https://hoiday-booking.onrender.com/uploads/' +
                        place.photos[0]
                      }
                      alt=''
                    />
                  )}
                </div>
                <div className='pl-6 flex flex-col items-start overflow-hidden mt-2 '>
                  <h2 className='text-md md:text-2xl  grow-0 shrink'>
                    {place.title}
                  </h2>
                  <p className='hidden md:flex mt-3 pl-4 text-md text-left max-h-48  font-medium '>
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
                        d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                      />
                    </svg>
                    <span className='pl-1'>{place.address}</span>
                  </p>
                  <p className=' hidden md:flex mt-2 pl-4 text-md text-left max-h-48  font-medium'>
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
                        d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='pl-1'>${place.price} per night</span>
                  </p>
                  <p className='mt-2 pl-4 text-md text-left max-h-48 hidden md:flex font-medium'>
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
                        d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                      />
                    </svg>
                    <span className='pl-1'>Check out: {place.checkIn}</span>
                  </p>
                  <p className='mt-2 pl-4 text-md text-left max-h-48 hidden md:flex font-medium'>
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
                        d='M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                      />
                    </svg>
                    <span className='pl-1'>Check out: {place.checkOut}</span>
                  </p>
                </div>
                <button className='p-2 primary px-6 border bg-white rounded-2xl absolute bottom-2 right-2'>
                  Edit
                </button>
              </Link>
            ))}
        </div>
        <Link
          className='inline-flex  bg-primary text-white py-2 px-6 rounded-full mt-4'
          to={'/account/places/new'}
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
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add a new place
        </Link>
      </div>
    </div>
  );
}
