import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {QuizType} from '../services/quizApi';
import ButtonStyles from '../styles/ButtonStyles';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const QuizItemEl = styled.article`
   padding: ${em(22)} ${em(28)};
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: ${props => props.theme.color2 as string};
   gap: ${em(24)};
   @media (${md(layout.md3)}) {
      flex-direction: column;
      align-items: stretch;
   }
`;
const Info = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(12)};
   overflow: hidden;
`;
const Title = styled.h2`
   font-size: ${em(28)};
   font-weight: 700;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;
const Description = styled.p`
   font-size: ${em(20)};
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   overflow: hidden;
`;
const ButtonEl = styled(Link)`
   ${ButtonStyles}
   display: inline-flex;
   justify-content: center;
   align-items: center;
   background: ${props => props.theme.color4 as string};
   color: ${props => props.theme.color2 as string};
   min-width: ${em(124)};
   @media (hover: hover) {
      &:hover {
         color: ${props => props.theme.color4 as string};
         background: ${props => props.theme.color3 as string};
      }
   }
`;

interface QuizItemProps {
   quiz: QuizType;
}
const QuizItem = ({quiz}: QuizItemProps) => (
   <QuizItemEl>
      <Info>
         <Title>{quiz.name}</Title>
         <Description>{quiz.description}</Description>
      </Info>
      <ButtonEl to={`/quiz/${quiz.id}`}>
         <span>Play</span>
      </ButtonEl>
   </QuizItemEl>
);
export default QuizItem;
