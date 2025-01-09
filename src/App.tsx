import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Layout from './components/core/Layout';
import Home from './pages/Home';

const isDev = import.meta.env.MODE === 'development';
const basename = isDev ? '/' : (import.meta.env.VITE_PRODUCTION_ROOT as string);

const CreateQuiz = lazy(() => import('./pages/CreateQuiz'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

const App = () => (
   <BrowserRouter basename={basename}>
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/create-quiz' element={<CreateQuiz />} />
            <Route path='/quiz/:id' element={<QuizPage />} />
         </Route>
      </Routes>
   </BrowserRouter>
);
export default App;
