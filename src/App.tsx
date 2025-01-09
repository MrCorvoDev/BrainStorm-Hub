import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/header/Header';
import RouterLazyLoader from './components/loading/RouterLazyLoader';
import Home from './pages/Home';
import ScrollResetService from './services/ScrollResetService';

const CreateQuiz = lazy(() => import('./pages/CreateQuiz'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

const App = () => (
   <div className='app'>
      <BrowserRouter
         basename={
            import.meta.env.MODE === 'development'
               ? '/'
               : (import.meta.env.VITE_PRODUCTION_ROOT as string)
         }
      >
         <ScrollResetService />
         <Header />
         <div className='content'>
            <Routes>
               <Route element={<RouterLazyLoader />}>
                  <Route index element={<Home />} />
                  <Route path='create-quiz' element={<CreateQuiz />} />
                  <Route path='quiz/:id' element={<QuizPage />} />
               </Route>
            </Routes>
         </div>
         <Footer />
      </BrowserRouter>
   </div>
);
export default App;
