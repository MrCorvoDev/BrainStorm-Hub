import {Suspense} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import SpinnerBox from './SpinnerBox';

const RouterLazyLoader = () => {
   const location = useLocation();

   return (
      <Suspense key={location.key} fallback={<SpinnerBox />}>
         <Outlet />
      </Suspense>
   );
};
export default RouterLazyLoader;
