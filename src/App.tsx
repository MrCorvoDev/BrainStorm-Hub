import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/header/Header';
import CreateQuiz from './pages/CreateQuiz';
import Home from './pages/Home';

const App = () => (
   <div className='app'>
      <BrowserRouter>
         <Header />
         <div className='content'>
            <Routes>
               <Route index element={<Home />} />
               <Route path='create-quiz' element={<CreateQuiz />} />
            </Routes>
         </div>
         <Footer />
      </BrowserRouter>
   </div>
);
export default App;
