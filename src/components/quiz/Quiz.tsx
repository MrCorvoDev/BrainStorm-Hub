import {AnimatePresence, motion, Variants} from 'motion/react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import useSWR from 'swr';

import {
   getQuiz,
   OptionType,
   quizzesURL as quizzesCacheKey,
} from '../../services/quizApi';
import {layout} from '../../styles/theme';
import em from '../../styles/utils/em';
import md from '../../styles/utils/md';
import getPercent from '../../utils/getPercent';
import round from '../../utils/round';
import Button from '../form/Button';

const QuizEl = styled(motion.div)<{$status: string}>`
   flex: 1 1 auto;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   gap: ${em(24)};
   ${({$status}) =>
      $status === 'intro'
         ? css`
              justify-content: center;
           `
         : css`
              @media (${md(layout.md3, 'min')}) {
                 padding-top: 15vh;
              }
              @media (${md(layout.md3)}) {
                 padding-top: 5vh;
              }
           `}
`;

const Title = styled.h1`
   font-size: ${em(38)};
   font-weight: 700;
`;
const Description = styled.p`
   font-size: ${em(26)};
   margin-bottom: ${em(8)};
`;
const Info = styled.p`
   font-size: ${em(18)};
   margin-bottom: ${em(32)};
`;

const ButtonBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: ${em(28)};
`;
const ButtonEl = styled(Button)`
   min-width: ${em(250)};
`;

const Progress = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: ${em(16)};
   margin-bottom: ${em(32)};
`;
const ProgressText = styled.div`
   font-size: ${em(28)};
`;
const ProgressCount = styled.div`
   font-size: ${em(32)};
   font-weight: 700;
   letter-spacing: ${em(6, 32)};
`;
const ProgressInfo = styled.span`
   font-size: ${em(18)};
`;
const ProgressLine = styled(motion.div)`
   height: ${em(6)};
`;
const ProgressBar = styled(ProgressLine)<{$small?: boolean}>`
   width: ${({$small}) => ($small ? em(150) : em(300))};
   display: inline-flex;
   border-radius: 5px;
   overflow: hidden;
   background: ${props => props.theme.color2 as string};
`;
const ProgressLineSuccess = styled(ProgressLine)`
   background: #59ff78;
`;
const ProgressLineError = styled(ProgressLine)`
   background: #ff5f5f;
`;

const QuestionBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(24)};
`;
const Question = styled(motion.h2)`
   font-size: ${em(32)};
   font-weight: 700;
   @media (${md(layout.md3)}) {
      font-size: ${em(28)};
   }
`;
const Options = styled.div<{$columns: number}>`
   display: grid;
   grid-template-columns: ${({$columns}) => `repeat(${$columns}, 1fr)`};
   gap: ${em(16)};
   @media (${md(layout.md3)}) {
      grid-template-columns: 1fr 1fr;
   }
`;
const Option = styled(Button)`
   padding-top: ${em(8)};
   padding-bottom: ${em(8)};
   width: 100%;
   height: 100%;
`;

const fadeIn: Variants = {
   hidden: {opacity: 0},
   visible: {opacity: 1, transition: {duration: 0.5, staggerChildren: 0.5}},
};

const fadeUp: Variants = {
   exit: {...fadeIn.hidden, y: 0},
   hidden: {...fadeIn.hidden, y: 10},
   visible: {...fadeIn.visible, y: 0},
};

const Quiz = () => {
   const navigate = useNavigate();
   const {id} = useParams();

   const {data: quiz} = useSWR(
      [quizzesCacheKey, id],
      async ([, id]: string[]) => await getQuiz(id),
      {
         suspense: true,
      },
   );

   const [status, setStatus] = useState<'intro' | 'quiz' | 'result'>('intro');
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

   const handleGoHome = () => {
      (async () => {
         await navigate('/');
      })().catch(console.error);
   };

   const handleOptionSelect = (option: OptionType) => {
      const isCorrect = option.value === currentQuestion.answer.value;
      const increaseByOne: React.SetStateAction<number> = prev => prev + 1;

      if (isCorrect) setCorrectAnswers(increaseByOne);
      else setWrongAnswers(increaseByOne);

      if (isFinished) setStatus('result');
      else setProgress(increaseByOne);
   };

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
            {status === 'intro' && (
               <>
                  <Title>{quiz.name}</Title>
                  <Description>{quiz.description}</Description>
                  <Info>
                     Estimated time to finish:{' '}
                     {round(quiz.questions.length / 2.5, 0)} minutes
                  </Info>
                  <ButtonEl onClick={() => setStatus('quiz')}>
                     <span>Play</span>
                  </ButtonEl>
               </>
            )}
            {status === 'quiz' && (
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
                              width: getPercent(
                                 wrongAnswers,
                                 totalAnswered,
                                 'percent',
                              ),
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
                              <Option
                                 onClick={() => handleOptionSelect(option)}
                              >
                                 {option.label}
                              </Option>
                           </motion.div>
                        ))}
                     </Options>
                  </QuestionBox>
               </>
            )}
            {status === 'result' && (
               <>
                  <Title>Result</Title>
                  <Description>{quiz.name}</Description>
                  <Progress>
                     <ProgressText>You answered</ProgressText>
                     <ProgressCount>
                        {correctAnswers}/{totalQuestions}
                     </ProgressCount>
                     <ProgressBar $small>
                        <ProgressLineSuccess
                           style={{
                              width: getPercent(
                                 correctAnswers,
                                 totalAnswered,
                                 'percent',
                              ),
                           }}
                        />
                        <ProgressLineError
                           style={{
                              width: getPercent(
                                 wrongAnswers,
                                 totalAnswered,
                                 'percent',
                              ),
                           }}
                        />
                     </ProgressBar>
                     <ProgressText>question correct</ProgressText>
                  </Progress>
                  <ButtonBox>
                     <ButtonEl onClick={handleReset}>
                        <span>Play again</span>
                     </ButtonEl>
                     <ButtonEl onClick={handleGoHome}>
                        <span>Go home</span>
                     </ButtonEl>
                  </ButtonBox>
               </>
            )}
         </QuizEl>
      </AnimatePresence>
   );
};
export default Quiz;
