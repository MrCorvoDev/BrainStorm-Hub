import useResizeService from '../../hooks/useResizeService';
import useScrollService from '../../hooks/useScrollService';
import Footer from '../Footer';
import Header from '../header/Header';
import RouterLazyLoader from '../loading/RouterLazyLoader';

const Layout = () => {
   useScrollService();
   useResizeService();

   return (
      <div id='app'>
         <Header />
         <div id='content'>
            <RouterLazyLoader />
         </div>
         <Footer />
      </div>
   );
};
export default Layout;
