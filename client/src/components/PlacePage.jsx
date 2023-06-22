import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { UserContext } from '../UserContext';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';

export default function PlacePage({ extendedHeader, setExtendedHeader }) {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let numberOfNights = 0;

  if (startDate && endDate) {
    numberOfNights = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  const handleReservation = async () => {
    if (user) {
      const data = {
        user,
        place,
        hostid: place.owner,
        startDate,
        endDate,
        numberOfGuests,
        price: place.price * numberOfNights,
        allDates: getDatesInRange(startDate, endDate),
      };
      try {
        await axios.post('/reserve', data);
        console.log('done');

        setRedirect2(true);
      } catch (e) {
        alert('reservation failed');
        console.log(e);
      }
    } else {
      setRedirect(true);
    }
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start);

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  if (redirect2) {
    return <Navigate to={'/account/bookings'} />;
  }

  if (showAllPhotos)
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='p-8 grid gap-4 bg-black text-white'>
          <div>
            <h2 className='text-3xl md:mr-48'>Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=' fixed md:right-12 right-2 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-white text-black '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z'
                  clipRule='evenodd'
                />
              </svg>
              <div className='hidden md:block'>Close photos</div>
            </button>
          </div>
          <div className='flex flex-col gap-4 items-center'>
            {place?.photos.length > 0 &&
              place.photos.map((photo) => (
                <div key=''>
                  <img
                    className='object-cover aspect-square'
                    alt=''
                    src={'http://localhost:4000/uploads/' + photo}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  return (
    <div
      onMouseOver={() => setExtendedHeader(false)}
      className='mt-8 2xl:px-40'
    >
      <h1 className='text-2xl font-semibold pt-4'>{place.title}</h1>
      <Link
        target='_blank'
        to={'https://maps.google.com/?q=' + place.address}
        className=' py-2 flex font-medium'
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
            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
          />
        </svg>

        {place.address}
      </Link>
      <div className='relative'>
        <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden'>
          <div className=''>
            {place.photos?.[0] && (
              <div className=''>
                <img
                  className='object-cover aspect-square'
                  src={'http://localhost:4000/uploads/' + place.photos[0]}
                  alt=''
                />
              </div>
            )}
          </div>
          <div className='grid overflow-hidden'>
            {place.photos?.[1] && (
              <img
                className='object-cover aspect-square'
                src={'http://localhost:4000/uploads/' + place.photos[1]}
                alt=''
              />
            )}
            {place.photos?.[2] && (
              <img
                className='object-cover aspect-square relative top-2'
                src={'http://localhost:4000/uploads/' + place.photos[2]}
                alt=''
              />
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setShowAllPhotos(true);
          }}
          className='flex gap-1 bg-gray-100 rounded-xl absolute bottom-2 right-2 px-2 py-1 border-black border'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6 '
          >
            <path
              fillRule='evenodd'
              d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
              clipRule='evenodd'
            />
          </svg>
          Show all photos
        </button>
      </div>

      <div className='grid my-6 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className=''>
            <h2 className='font-medium text-2xl'>Description</h2>
            <div className='flex text-sm border-b py-2 gap-4'>
              <div>Check-in: {place.checkIn}</div>
              <div>Check-out: {place.checkOut}</div>
              <div>Max guests: {place.maxGuests}</div>
            </div>
            <div className='mt-2 text-md'> {place.description}</div>
          </div>
        </div>
        <div className='bg-white shadow border rounded-2xl'>
          <div className='text-2xl mt-4 text-center'>
            Price: <span className='font-medium'>${place.price}</span> / per
            night
          </div>
          <div className='border rounded-2xl mt-4 mx-4'>
            <div
              className='flex justify-center cursor-pointer'
              onClick={() => setShowCalendar(true)}
            >
              <div className='p-3 '>
                <div className='font-medium'>Check in:</div>
                <div>{format(startDate, 'dd MMMM yyyy')}</div>
              </div>
              <div className='p-3 border-l'>
                <div className='font-medium'>Check out:</div>
                <div>{format(endDate, 'dd MMMM yyyy')}</div>
              </div>
            </div>
            {showCalendar && (
              <div>
                <DateRangePicker
                  showDateDisplay={false}
                  disabledDates={place.unavailableDates.map((date) =>
                    parseISO(date)
                  )}
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={['#f5385d']}
                  onChange={handleSelect}
                  className='flex justify-center '
                />
              </div>
            )}

            <div className='p-3 border-t'>
              <label className='font-medium'>Number of guests:</label>
              <input
                type='number'
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-center mb-4'>
            <button
              onClick={handleReservation}
              className='primary mt-4 p-2 font-medium w-[80%] mx-auto'
            >
              Reserve
            </button>
          </div>

          {numberOfNights > 0 && (
            <div className='mt-2 justify-center flex  gap-2 mb-4 border-t pt-2'>
              <div className='font-medium text-sm'>
                Number of nights: {numberOfNights}
              </div>
              <div className='font-medium text-sm'>
                Total price: ${numberOfNights * place.price}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=''>
        <h2 className='font-medium text-2xl border-t pt-4'>Extra info</h2>
      </div>
      <div className='text-md mt-2 border-b pb-4'>{place.extraInfo}</div>
      <div>
        <h2 className='font-medium text-2xl pt-4 pb-2'>
          What this place offers
        </h2>
        <div>
          <div className=' flex flex-col'>
            {place.perks.includes('wi-fi') && (
              <div className='flex gap-2 p-2'>
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
                    d='M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z'
                  />
                </svg>
                <span>Wi-fi</span>
              </div>
            )}
            {place.perks.includes('parking') && (
              <div className='flex gap-2 p-2'>
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
                    d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>

                <span>Free parking</span>
              </div>
            )}

            {place.perks.includes('tv') && (
              <div className='flex gap-2 p-2'>
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
                    d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z'
                  />
                </svg>

                <span>TV</span>
              </div>
            )}
            {place.perks.includes('private entrance') && (
              <div className='flex gap-2 p-2'>
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
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
                <span>Private entrance</span>
              </div>
            )}
            {place.perks.includes('pets') && (
              <div className='flex gap-2 p-2'>
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
                    d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>

                <span>Pets allowed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
