import {useContext} from 'react';

import {QuestionsContext} from '../contexts/QuestionsContext';

const useQuestions = () => useContext(QuestionsContext);

export default useQuestions;
