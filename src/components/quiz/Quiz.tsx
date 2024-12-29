import {AnimatePresence} from 'motion/react';

import useQuiz from '../../hooks/useQuiz';
import Intro from './Intro';
import QuizBody from './QuizBody';
import Result from './Result';
import {QuizEl} from './styles';

const Quiz = () => {
   const {status, fadeUp, fadeIn} = useQuiz();

   return (
      <AnimatePresence mode='wait'>
         <QuizEl
            $status={status}
            key={status}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={status === 'intro' ? fadeUp : fadeIn}
         >
            {status === 'intro' && <Intro />}
            {status === 'quiz' && <QuizBody />}
            {status === 'result' && <Result />}
         </QuizEl>
      </AnimatePresence>
   );
};
export default Quiz;
