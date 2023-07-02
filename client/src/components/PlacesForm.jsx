import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlacesForm({ extendedHeader, setExtendedHeader }) {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirectToPlaceList, setRedirectToPlacesList] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;

      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });

    setPhotoLink('');
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  function handleCheckboxClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put('/places/' + id, {
        id,
        ...placeData,
      });

      setRedirectToPlacesList(true);
    } else {
      await axios.post('/places', placeData);
      console.log(placeData);
      setRedirectToPlacesList(true);
    }
  }

  if (redirectToPlaceList) {
    return <Navigate to={'/account/places'} />;
  }

  function removePhoto(filename) {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    const addedPhotoWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );

    const newAddedPhotos = [filename, ...addedPhotoWithoutSelected];

    setAddedPhotos(newAddedPhotos);
  }

  return (
    <form
      onMouseOver={() => setExtendedHeader(false)}
      onSubmit={savePlace}
      className='w-full xl:w-9/12 mx-auto'
    >
      {preInput('Title', 'Title for your place')}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title eg. cosy studio'
          type='text'
          className='p-1'
        ></input>
        {preInput('Address', 'Address of your place')}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='address'
          type='text'
          className='p-1'
        ></input>
        {preInput('Photos', 'Photos of your place')}
        <div className='flex gap-2'>
          <input
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            type='text'
            placeholder='Add using a link (jpg)'
            className='p-1'
          ></input>
          <button
            onClick={addPhotoByLink}
            className='bg-gray-200 grow px-4 rounded-2xl'
          >
            Add&nbsp;photo
          </button>
        </div>
        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className='h-32 flex relative' key={link}>
                <img
                  className='rounded-2xl w-full object-cover'
                  src={'http://localhost:4000/uploads/' + link}
                  alt=''
                />
                <button
                  onClick={() => removePhoto(link)}
                  className='absolute right-2 top-2 bg-red-600 bg-opacity-90 rounded-full cursor-pointer'
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => selectAsMainPhoto(e, link)}
                  className='absolute right-2 bottom-2 bg-black bg-opacity-20 rounded-full cursor-pointer'
                >
                  {link === addedPhotos[0] && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
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
                        d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          <label className=' flex items-center justify-center border bg-transparent rounded-2xl p-8 text-xl text-gray-600'>
            <input
              multiple
              className='hidden cursor-pointer'
              onChange={uploadPhoto}
              type='file'
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75'
              />
            </svg>
            Upload
          </label>
        </div>
        {preInput('Description', 'Description of your apartment')}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {preInput('Perks', '   Select all the perks of your place')}

        <div className=' mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
          <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
            <input
              onChange={handleCheckboxClick}
              type='checkbox'
              checked={perks.includes('wi-fi')}
              name='wi-fi'
            />
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
          </label>
          <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
            <input
              type='checkbox'
              checked={perks.includes('parking')}
              name='parking'
              onChange={handleCheckboxClick}
            />
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
          </label>
          <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
            <input
              type='checkbox'
              checked={perks.includes('tv')}
              onChange={handleCheckboxClick}
              name='tv'
            />
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
          </label>

          <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
            {' '}
            <input
              type='checkbox'
              checked={perks.includes('private entrance')}
              onChange={handleCheckboxClick}
              name='private entrance'
            />
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
          </label>

          <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer '>
            <input
              type='checkbox'
              checked={perks.includes('pets')}
              onChange={handleCheckboxClick}
              name='pets'
            />
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
          </label>
        </div>
      </div>
      {preInput('Extra info', 'House rules, etc.')}

      <textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      ></textarea>
      {preInput(
        'Check in&out times, max guests',
        ' Add check in, check out time and maximum number of guests'
      )}

      <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
        <div>
          <h3 className='mt-2 -mb-1'>Check in time</h3>
          <input
            className='p-1'
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder='14:00'
            type='text'
          />
        </div>
        <div>
          <h3 className='mt-2 -mb-1'>Check out time</h3>
          <input
            className='p-1'
            placeholder='11:00'
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            type='text'
          />
        </div>
        <div>
          <h3 className='mt-2 -mb-1'>Max number of guests</h3>
          <input
            className='p-1'
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            type='number'
          />
        </div>
        <div>
          <h3 className='mt-2 -mb-1'>Price per night</h3>
          <input
            className='p-1'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type='number'
          />
        </div>
      </div>
      <button className='primary my-4 px-8 py-2'>Save</button>
    </form>
  );
}
