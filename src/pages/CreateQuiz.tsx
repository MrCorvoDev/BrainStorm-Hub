import styled from 'styled-components';

import em from '../styles/utils/em';

const Headline = styled.h1`
   margin-top: ${em(48)};
   font-size: ${em(32)};
`;

const CreateQuiz = () => (
   <div className='container'>
      <Headline>Create Quiz</Headline>
   </div>
);
export default CreateQuiz;
