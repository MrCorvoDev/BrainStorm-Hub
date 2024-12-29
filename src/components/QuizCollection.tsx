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

   const reversedQuizzes = [...quizzes].reverse();

   return reversedQuizzes.map(quiz => <QuizItem key={quiz.id} quiz={quiz} />);
};
export default QuizCollection;
