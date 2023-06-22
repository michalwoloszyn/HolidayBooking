import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';

export default function Header({ extendedHeader, setExtendedHeader }) {
  const { user } = useContext(UserContext);
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [destination, setDestination] = useState('');
  const [expandedOnce, setExpandedOnce] = useState(false);
  const [dateIsSet, setDateIsSet] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  if (redirect) {
    setTimeout(() => {
      window.location.reload();
    }, '10');

    return (
      <Navigate
        to={'/'}
        state={{
          guests: guests,
          startDate: startDate,
          endDate: endDate,
          destination: destination,
          dateIsSet: dateIsSet,
        }}
      />
    );
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  return (
    <div>
      <header className='bg-white flex justify-between border-b pb-4  md:-mx-20 w-screen overflow-hidden'>
        <Link
          state={{
            guests: guests,
            startDate: startDate,
            endDate: endDate,
            destination: destination,
            dateIsSet: dateIsSet,
          }}
          to={'/'}
          className='md:flex items-center gap-1 md:ml-12 hidden '
          src='logo'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 -rotate-90'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
            />
          </svg>
          <span className='font-bold text-sm md:text-xl hidden md:block text-[#f5385d]'>
            airbnb 2.0
          </span>
        </Link>
        <form>
          <div className='flex border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 items-center'>
            <div
              onClick={() => {
                setExtendedHeader(true);
                setExpandedOnce(true);
              }}
              className='font-semibold md:text-sm text-xs   border-gray-300 px-2 truncate md:max-w-[100px] max-w-[75px]'
            >
              {destination ? destination : 'Anywhere'}
            </div>

            <div
              onClick={() => {
                setExtendedHeader(true);
                setExpandedOnce(true);
              }}
              className='font-semibold  text-xs md:text-sm border-r border-l  border-gray-300 px-2 min-w-[90px]'
            >
              {expandedOnce ? (
                <div>
                  {format(startDate, ' dd-MM-yy')}
                  <br />

                  {format(endDate, ' dd-MM-yy')}
                </div>
              ) : (
                'Any week'
              )}
            </div>

            <div
              onClick={() => {
                setExtendedHeader(true);
                setExpandedOnce(true);
              }}
              className='px-2 text-sm '
            >
              {expandedOnce ? 'Guests: ' + guests : 'Add guests'}
            </div>

            <button
              onClick={() => setRedirect(true)}
              className='bg-primary rounded-full text-white p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </div>
        </form>
        <Link to={user ? '/account' : '/login'}>
          <div className='flex gap-4 border border-gray-300 rounded-full py-2 px-4 items-center mr-20 mt-1 ml-2'>
            <div className='rounded-full bg-gray-500 text-white border border-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 relative top-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            </div>
            {!user && <div className='font-medium hidden md:block '>Login</div>}
            {!!user && (
              <div className='font-medium hidden md:block '>{user.name}</div>
            )}
          </div>
        </Link>
      </header>
      {extendedHeader && (
        <div className='flex justify-center'>
          <div className='mt-4 p-4 mb-4 rounded-2xl border flex flex-col md:flex-row gap-10 md:w-1/2 w-full'>
            <div
              onClick={() => {
                console.log(dateIsSet);
                setDateIsSet(true);
                console.log(dateIsSet);
              }}
            >
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={['#f5385d']}
                onChange={handleSelect}
              />
            </div>

            <div className='flex-col flex justify-center items-center'>
              <label className='px-2 '>
                Destination:
                <input
                  type='text'
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className='search'
                />
              </label>
              <label className='px-2 '>
                Add guests:
                <input
                  min={1}
                  type='number'
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className='search'
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
