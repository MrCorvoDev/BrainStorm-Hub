import {useContext} from 'react';

import {QuestionsContext} from '../contexts/QuestionsProvider';

const useQuestions = () => useContext(QuestionsContext);

export default useQuestions;
