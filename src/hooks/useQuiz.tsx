import {useContext} from 'react';

import QuizContext from '../contexts/QuizContext';

const useQuiz = () => useContext(QuizContext);

export default useQuiz;
