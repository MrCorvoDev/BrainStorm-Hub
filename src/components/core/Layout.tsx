import ScrollResetService from '../../services/ScrollResetService';
import Footer from '../Footer';
import Header from '../header/Header';
import RouterLazyLoader from '../loading/RouterLazyLoader';

const Layout = () => (
   <div className='app'>
      <ScrollResetService />
      <Header />
      <div className='content'>
         <RouterLazyLoader />
      </div>
      <Footer />
   </div>
);
export default Layout;
