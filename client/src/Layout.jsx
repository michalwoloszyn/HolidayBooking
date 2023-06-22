import Header from './components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout({ extendedHeader, setExtendedHeader }) {
  return (
    <div className='py-4 px-4 md:px-20 flex flex-col min-h-screen overflow-hidden'>
      <Header
        extendedHeader={extendedHeader}
        setExtendedHeader={setExtendedHeader}
      />
      <Outlet />
    </div>
  );
}
