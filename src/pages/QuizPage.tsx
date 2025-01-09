import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import Section from '../components/core/Section';
import ErrorFallback from '../components/ErrorFallback';
import Quiz from '../components/quiz/Quiz';
import Spinner from '../components/Spinner';
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

const QuizSpinner = styled(Spinner)`
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
   font-size: 1.7em;
`;

const QuizPage = () => (
   <SectionEl>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
         <Suspense fallback={<QuizSpinner />}>
            <Container className='container'>
               <QuizProvider>
                  <Quiz />
               </QuizProvider>
            </Container>
         </Suspense>
      </ErrorBoundary>
   </SectionEl>
);
export default QuizPage;
