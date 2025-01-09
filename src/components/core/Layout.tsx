import useResizeService from '../../hooks/useResizeService';
import useScrollService from '../../hooks/useScrollService';
import Footer from '../Footer';
import Header from '../header/Header';
import RouterLazyLoader from '../loading/RouterLazyLoader';

const Layout = () => {
   useScrollService();
   useResizeService();

   return (
      <div className='app'>
         <Header />
         <div className='content'>
            <RouterLazyLoader />
         </div>
         <Footer />
      </div>
   );
};
export default Layout;
