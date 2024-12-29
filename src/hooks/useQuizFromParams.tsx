import {useParams} from 'react-router-dom';
import useSWR from 'swr';

import {getQuiz, quizzesURL} from '../services/quizApi';

const useQuizFromParams = () => {
   const {id} = useParams();

   const {data: quiz} = useSWR(
      [quizzesURL, id],
      async ([, id]: string[]) => await getQuiz(id),
      {
         suspense: true,
      },
   );

   return quiz;
};
export default useQuizFromParams;
