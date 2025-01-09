import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Layout from './components/core/Layout';
import Home from './pages/Home';

const CreateQuiz = lazy(() => import('./pages/CreateQuiz'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

const App = () => (
   <BrowserRouter
      basename={
         import.meta.env.MODE === 'development'
            ? '/'
            : (import.meta.env.VITE_PRODUCTION_ROOT as string)
      }
   >
      <Routes>
         <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='create-quiz' element={<CreateQuiz />} />
            <Route path='quiz/:id' element={<QuizPage />} />
         </Route>
      </Routes>
   </BrowserRouter>
);
export default App;
