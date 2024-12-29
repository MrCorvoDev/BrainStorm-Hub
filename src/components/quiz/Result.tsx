import useQuiz from '../../hooks/useQuiz';
import getPercent from '../../utils/getPercent';
import {
   ButtonBox,
   ButtonEl,
   Description,
   Progress,
   ProgressBar,
   ProgressCount,
   ProgressLineError,
   ProgressLineSuccess,
   ProgressText,
   Title,
} from './styles';

const Result = () => {
   const {
      quiz,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      totalAnswered,
      handleReset,
      handleGoHome,
   } = useQuiz();
   return (
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
                     width: getPercent(wrongAnswers, totalAnswered, 'percent'),
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
   );
};
export default Result;
