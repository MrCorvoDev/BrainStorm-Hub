import {motion} from 'motion/react';
import styled, {css} from 'styled-components';

import {layout} from '../../styles/theme';
import em from '../../styles/utils/em';
import md from '../../styles/utils/md';
import Button from '../form/Button';

export const QuizEl = styled(motion.div)<{$status: string}>`
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

export const Title = styled.h1`
   font-size: ${em(38)};
   font-weight: 700;
`;
export const Description = styled.p`
   font-size: ${em(26)};
   margin-bottom: ${em(8)};
`;
export const Info = styled.p`
   font-size: ${em(18)};
   margin-bottom: ${em(32)};
`;

export const ButtonBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: ${em(28)};
`;
export const ButtonEl = styled(Button)`
   min-width: ${em(250)};
`;

export const Progress = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: ${em(16)};
   margin-bottom: ${em(32)};
`;
export const ProgressText = styled.div`
   font-size: ${em(28)};
`;
export const ProgressCount = styled.div`
   font-size: ${em(32)};
   font-weight: 700;
   letter-spacing: ${em(6, 32)};
`;
export const ProgressInfo = styled.span`
   font-size: ${em(18)};
`;
export const ProgressLine = styled(motion.div)`
   height: ${em(6)};
`;
export const ProgressBar = styled(ProgressLine)<{$small?: boolean}>`
   width: ${({$small}) => ($small ? em(150) : em(300))};
   display: inline-flex;
   border-radius: 5px;
   overflow: hidden;
   background: ${props => props.theme.color2 as string};
`;
export const ProgressLineSuccess = styled(ProgressLine)`
   background: #59ff78;
`;
export const ProgressLineError = styled(ProgressLine)`
   background: #ff5f5f;
`;

export const QuestionBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(24)};
`;
export const Question = styled(motion.h2)`
   font-size: ${em(32)};
   font-weight: 700;
   @media (${md(layout.md3)}) {
      font-size: ${em(28)};
   }
`;
export const Options = styled.div<{$columns: number}>`
   display: grid;
   grid-template-columns: ${({$columns}) => `repeat(${$columns}, 1fr)`};
   gap: ${em(16)};
   @media (${md(layout.md3)}) {
      grid-template-columns: 1fr 1fr;
   }
`;
export const Option = styled(Button)`
   padding-top: ${em(8)};
   padding-bottom: ${em(8)};
   width: 100%;
   height: 100%;
`;
