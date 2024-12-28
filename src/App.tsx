import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/header/Header';
import CreateQuiz from './pages/CreateQuiz';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';

const App = () => (
   <div className='app'>
      <BrowserRouter
         basename={
            import.meta.env.MODE === 'development'
               ? '/'
               : (import.meta.env.VITE_PRODUCTION_ROOT as string)
         }
      >
         <Header />
         <div className='content'>
            <Routes>
               <Route index element={<Home />} />
               <Route path='create-quiz' element={<CreateQuiz />} />
               <Route path='quiz/:id' element={<QuizPage />} />
            </Routes>
         </div>
         <Footer />
      </BrowserRouter>
   </div>
);
export default App;
