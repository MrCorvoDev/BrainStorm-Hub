import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDebounce} from '@uidotdev/usehooks';
import {Suspense, useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import ErrorFallback from '../components/ErrorFallback';
import Input from '../components/form/Input';
import QuizCollection from '../components/QuizCollection';
import Section from '../components/Section';
import SkeletonQuizItem from '../components/SkeletonQuizItem';
import em from '../styles/utils/em';

const QuizContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(24)};
`;

const InputBox = styled.div`
   position: relative;
   margin-bottom: ${em(16)};
`;
const InputEl = styled(Input)`
   padding-right: ${em(16 + 24 + 16)};
`;
const InputReset = styled.button`
   position: absolute;
   right: ${em(16)};
   top: 50%;
   transform: translateY(-50%);
   svg {
      height: ${em(32)};
   }
`;
const Home = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

   return (
      <Section>
         <div className='container'>
            <QuizContainer>
               <InputBox>
                  <InputEl
                     type='text'
                     name='search'
                     placeholder='Search'
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                     <InputReset
                        type='button'
                        onClick={() => setSearchQuery('')}
                     >
                        <FontAwesomeIcon icon={faTimesCircle} />
                     </InputReset>
                  )}
               </InputBox>
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense
                     fallback={[...Array(10).keys()].map(i => (
                        <SkeletonQuizItem key={i} />
                     ))}
                  >
                     <QuizCollection
                        searchQuery={debouncedSearchQuery?.toLowerCase()}
                     />
                  </Suspense>
               </ErrorBoundary>
            </QuizContainer>
         </div>
      </Section>
   );
};
export default Home;
