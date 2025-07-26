
import { Navbar } from '../components/layout/navbar/Navbar';
import { Footer } from '../components/layout/footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return ( 
    <>
      <header>       
        <Navbar />
      </header>

      {/* z-0 для того, чтобы выпадающее меню из хэдэра не перекрывалось плашкой поиска планов */}
      <main className='z-0'> 
        <Outlet />
      </main>

      {/* z-[-1] для того, чтобы блёр от предупреждающего авторизационного окна перекрывал иконки социальных сетей */}
      <footer className=''>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;