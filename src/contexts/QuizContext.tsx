import {Variants} from 'motion/react';
import {createContext, MouseEventHandler, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import useQuizFromParams from '../hooks/useQuizFromParams';
import {OptionType, QuestionType} from '../services/quizApi';
import {QuizType} from '../services/quizApi';
import {ReactPropsChildrenType} from '../types/global';

interface QuizContextType {
   quiz: QuizType;
   status: 'intro' | 'quiz' | 'result';
   progress: number;
   correctAnswers: number;
   wrongAnswers: number;
   currentQuestion: QuestionType;
   totalQuestions: number;
   totalAnswered: number;
   optionsLength: number;
   handleReset: MouseEventHandler<HTMLButtonElement>;
   handleGoHome: MouseEventHandler<HTMLButtonElement>;
   handleOptionSelect: (option: OptionType) => void;
   handlePlay: MouseEventHandler<HTMLButtonElement>;
   fadeIn: Variants;
   fadeUp: Variants;
}

const QuizContext = createContext({} as QuizContextType);

const fadeIn: Variants = {
   hidden: {opacity: 0},
   visible: {opacity: 1, transition: {duration: 0.5, staggerChildren: 0.5}},
};

const fadeUp: Variants = {
   exit: {...fadeIn.hidden, y: 0},
   hidden: {...fadeIn.hidden, y: 10},
   visible: {...fadeIn.visible, y: 0},
};

export const QuizProvider = ({children}: ReactPropsChildrenType) => {
   const navigate = useNavigate();

   const quiz = useQuizFromParams();

   const [status, setStatus] = useState<QuizContextType['status']>('intro');
   const [progress, setProgress] = useState(0);
   const [correctAnswers, setCorrectAnswers] = useState(0);
   const [wrongAnswers, setWrongAnswers] = useState(0);

   const currentQuestion = quiz.questions[progress];
   const totalQuestions = quiz.questions.length;
   const totalAnswered = correctAnswers + wrongAnswers;
   const isFinished = progress + 1 === totalQuestions;
   const optionsLength = currentQuestion.options.length;

   const handleReset = () => {
      setStatus('quiz');
      setProgress(0);
      setCorrectAnswers(0);
      setWrongAnswers(0);
   };

   const handleGoHome = () => void navigate('/')?.catch(console.error);

   const handleOptionSelect = (option: OptionType) => {
      const isCorrect = option.value === currentQuestion.answer.value;
      const increaseByOne: React.SetStateAction<number> = prev => prev + 1;

      if (isCorrect) setCorrectAnswers(increaseByOne);
      else setWrongAnswers(increaseByOne);

      if (isFinished) setStatus('result');
      else setProgress(increaseByOne);
   };

   const handlePlay = () => setStatus('quiz');

   return (
      <QuizContext.Provider
         value={{
            quiz,
            status,
            progress,
            correctAnswers,
            wrongAnswers,
            currentQuestion,
            totalQuestions,
            totalAnswered,
            optionsLength,
            handleReset,
            handleGoHome,
            handleOptionSelect,
            handlePlay,
            fadeIn,
            fadeUp,
         }}
      >
         {children}
      </QuizContext.Provider>
   );
};

export default QuizContext;
