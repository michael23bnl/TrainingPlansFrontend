
import { Navbar } from '../components/layout/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return ( 
    <>
      <header>       
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex items-center flex-col border-t-8 border-blue-950">
        <ul className="p-10 flex items-center justify-center gap-4">
          <li>VK</li>
          <li>TG</li>
          <li>YT</li>
          <li>DS</li>
        </ul>
        <ul className="p-1 flex items-center justify-between gap-x-96">
          <li>Copyright © 2023-2025</li>
          <li>No rights reserved.</li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;