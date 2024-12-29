import useQuiz from '../../hooks/useQuiz';
import round from '../../utils/round';
import {ButtonEl, Description, Info, Title} from './styles';

const Intro = () => {
   const {quiz, handlePlay} = useQuiz();

   return (
      <>
         <Title>{quiz.name}</Title>
         <Description>{quiz.description}</Description>
         <Info>
            Estimated time to finish: {round(quiz.questions.length / 2.5, 0)}
            minutes
         </Info>
         <ButtonEl onClick={handlePlay}>
            <span>Play</span>
         </ButtonEl>
      </>
   );
};
export default Intro;
