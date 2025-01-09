import styled from 'styled-components';

import Section from '../components/core/Section';
import Quiz from '../components/quiz/Quiz';
import {QuizProvider} from '../contexts/QuizContext';

const SectionEl = styled(Section)`
   min-height: calc(100vh - var(--headerH));
   position: relative;
   display: flex;
   flex-direction: column;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1 1 auto;
`;

const QuizPage = () => (
   <SectionEl>
      <Container className='container'>
         <QuizProvider>
            <Quiz />
         </QuizProvider>
      </Container>
   </SectionEl>
);
export default QuizPage;
