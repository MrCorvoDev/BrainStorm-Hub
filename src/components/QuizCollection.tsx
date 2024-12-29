import Fuse from 'fuse.js';
import useSWR from 'swr';

import {
   getAllQuizzes,
   quizzesURL as quizzesCacheKey,
} from '../services/quizApi';
import QuizItem from './QuizItem';

interface QuizCollectionProps {
   searchQuery: string;
}
const QuizCollection = ({searchQuery}: QuizCollectionProps) => {
   const {data: serverQuizzes} = useSWR([quizzesCacheKey], getAllQuizzes, {
      suspense: true,
   });

   const reversedQuizzes = [...serverQuizzes].reverse();

   let quizzes = reversedQuizzes;
   if (searchQuery) {
      const fuse = new Fuse(reversedQuizzes, {
         includeScore: true,
         keys: [
            {
               name: 'name',
               weight: 1,
            },
            {
               name: 'description',
               weight: 0.5,
            },
         ],
      });

      quizzes = fuse.search(searchQuery).map(({item}) => item);
   }

   return quizzes.map(quiz => <QuizItem key={quiz.id} quiz={quiz} />);
};
export default QuizCollection;
