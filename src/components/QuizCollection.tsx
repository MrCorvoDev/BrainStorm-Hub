import useSWR from 'swr';

import {
   getAllQuizzes,
   quizzesURL as quizzesCacheKey,
} from '../services/quizApi';
import QuizItem from './QuizItem';

const QuizCollection = () => {
   const {data: quizzes} = useSWR([quizzesCacheKey], getAllQuizzes, {
      suspense: true,
   });

   return quizzes.map(quiz => <QuizItem key={quiz.id} quiz={quiz} />);
};
export default QuizCollection;
