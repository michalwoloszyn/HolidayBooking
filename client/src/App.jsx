import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Login from './components/Login';
import Layout from './Layout';
import Register from './components/Register';
import Account from './components/Account';
import Places from './components/Places';
import Bookings from './components/Bookings';
import PlacesForm from './components/PlacesForm';
import PlacePage from './components/PlacePage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { useState } from 'react';
axios.defaults.baseURL = 'https://hoiday-booking.onrender.com/';
axios.defaults.withCredentials = true;

function App() {
  const [extendedHeader, setExtendedHeader] = useState(false);
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              extendedHeader={extendedHeader}
              setExtendedHeader={setExtendedHeader}
            />
          }
        >
          <Route
            index
            element={
              <IndexPage
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/login'
            element={
              <Login
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/register'
            element={
              <Register
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/account/:subpage?'
            element={
              <Account
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/account/places'
            element={
              <Places
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/account/bookings'
            element={
              <Bookings
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/account/places/new'
            element={
              <PlacesForm
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/account/places/:id'
            element={
              <PlacesForm
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
          <Route
            path='/place/:id'
            element={
              <PlacePage
                extendedHeader={extendedHeader}
                setExtendedHeader={setExtendedHeader}
              />
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
