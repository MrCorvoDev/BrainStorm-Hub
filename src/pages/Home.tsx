import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import ErrorFallback from '../components/ErrorFallback';
import QuizCollection from '../components/QuizCollection';
import Section from '../components/Section';
import SkeletonQuizItem from '../components/SkeletonQuizItem';
import em from '../styles/utils/em';

const QuizContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(24)};
`;

const Home = () => (
   <Section>
      <div className='container'>
         <QuizContainer>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
               <Suspense
                  fallback={[...Array(10).keys()].map(i => (
                     <SkeletonQuizItem key={i} />
                  ))}
               >
                  <QuizCollection />
               </Suspense>
            </ErrorBoundary>
         </QuizContainer>
      </div>
   </Section>
);
export default Home;
