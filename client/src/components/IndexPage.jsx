import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function IndexPage({ extendedHeader, setExtendedHeader }) {
  const [places, setPlaces] = useState([]);
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
    if (state == null) {
      //all places
      axios.get('/home').then((response) => {
        setPlaces(response.data);
      });
    } else if (state.destination != '' && state.dateIsSet == true) {
      //search query for the destination and the date
      console.log('destination and date');
      axios
        .get('/home', {
          params: {
            destination: state.destination,
            startDate: state.startDate,
            endDate: state.endDate,
            guests: state.guests,
          },
        })
        .then((response) => {
          setPlaces(response.data);
        });
      console.log(state.dateIsSet);
    } else if (state.destination == '' && state.dateIsSet == true) {
      //just the date
      console.log('just the date');
      axios
        .get('/home', {
          params: {
            startDate: state.startDate,
            endDate: state.endDate,
            guests: state.guests,
          },
        })
        .then((response) => {
          setPlaces(response.data);
        });
    } else if (state.destination != '' && state.dateIsSet == false) {
      //just the destination
      console.log('just the destination');
      axios
        .get('/home', {
          params: {
            destination: state.destination,
            guests: state.guests,
          },
        })
        .then((response) => {
          setPlaces(response.data);
        });
    } else {
      //just guests
      console.log('just guests');
      axios
        .get('/home', {
          params: {
            guests: state.guests,
          },
        })
        .then((response) => {
          setPlaces(response.data);
        });
    }
  }, []);

  return (
    <div
      onMouseOver={() => setExtendedHeader(false)}
      className='grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 mt-8'
    >
      {places.length > 0 &&
        places.map((places) => (
          <Link to={'/place/' + places._id} className='' key={places._id}>
            <img
              className='rounded-2xl mb-2 object-cover aspect-square'
              src={'http://localhost:4000/uploads/' + places.photos?.[0]}
              alt=''
            />
            <div className='pl-2'>
              <h2 className='text-lg truncate '>{places.title}</h2>
              <h3 className='text-sm truncate'>{places.address}</h3>
              <div className='text-md mt-1'>
                <span className='font-semibold'>${places.price}</span> per night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
