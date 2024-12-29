import {motion} from 'motion/react';

import useQuiz from '../../hooks/useQuiz';
import getPercent from '../../utils/getPercent';
import {
   Option,
   Options,
   Progress,
   ProgressBar,
   ProgressCount,
   ProgressInfo,
   ProgressLineError,
   ProgressLineSuccess,
   Question,
   QuestionBox,
   Title,
} from './styles';

const QuizBody = () => {
   const {
      quiz,
      progress,
      correctAnswers,
      wrongAnswers,
      currentQuestion,
      totalQuestions,
      totalAnswered,
      optionsLength,
      fadeUp,
      handleOptionSelect,
   } = useQuiz();

   return (
      <>
         <Title>{quiz.name}</Title>
         <Progress>
            <ProgressCount>
               {progress + 1}/{totalQuestions}
            </ProgressCount>
            <ProgressInfo>Keep it green 👇</ProgressInfo>
            <ProgressBar>
               <ProgressLineSuccess
                  initial={{width: 0}}
                  animate={{
                     width: getPercent(
                        correctAnswers,
                        totalAnswered,
                        'percent',
                     ),
                  }}
                  transition={{duration: 0.5}}
               />
               <ProgressLineError
                  initial={{width: 0}}
                  animate={{
                     width: getPercent(wrongAnswers, totalAnswered, 'percent'),
                  }}
                  transition={{duration: 0.5}}
               />
            </ProgressBar>
         </Progress>
         <QuestionBox>
            <Question
               key={progress}
               initial='hidden'
               animate='visible'
               exit='exit'
               variants={fadeUp}
            >
               {currentQuestion.question}
            </Question>
            <Options $columns={optionsLength >= 4 ? 4 : 2}>
               {currentQuestion.options.map((option, i) => (
                  <motion.div
                     key={i}
                     initial='hidden'
                     animate='visible'
                     exit='exit'
                     variants={fadeUp}
                  >
                     <Option onClick={() => handleOptionSelect(option)}>
                        {option.label}
                     </Option>
                  </motion.div>
               ))}
            </Options>
         </QuestionBox>
      </>
   );
};
export default QuizBody;
