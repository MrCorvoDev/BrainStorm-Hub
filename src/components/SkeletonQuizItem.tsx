import styled, {keyframes} from 'styled-components';

import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const PulseAnimation = keyframes`
   50% {
      opacity: 0.5;
   }
`;
const Skeleton = styled.div`
   background: ${props => props.theme.color4 as string};
   animation: ${PulseAnimation} 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
   border-radius: 5px;
`;

const QuizItemEl = styled.div`
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
`;
const Title = styled(Skeleton)`
   width: ${em(250)};
   height: ${em(28)};
`;
const Description = styled(Skeleton)`
   width: ${em(350)};
   height: ${em(20)};
`;
const ButtonEl = styled(Skeleton)`
   min-height: ${em(64)};
   background: ${props => props.theme.color4 as string};
   min-width: ${em(124)};
`;

const SkeletonQuizItem = () => (
   <QuizItemEl>
      <Info>
         <Title />
         <Description />
      </Info>
      <ButtonEl />
   </QuizItemEl>
);
export default SkeletonQuizItem;
