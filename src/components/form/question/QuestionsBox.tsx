import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import styled from 'styled-components';

import IconButtonStyles from '../../../styles/IconButtonStyles';
import {layout} from '../../../styles/theme';
import em from '../../../styles/utils/em';
import md from '../../../styles/utils/md';
import QuestionsDnD from './QuestionsDnD';

const QuestionsBoxEl = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(16)};
   padding: ${em(16)} ${em(12)};
   border: 2px solid ${props => props.theme.color4 as string};
   border-radius: 5px;
   width: 100%;
`;

const AddQuestionButton = styled.button`
   padding: ${em(24)} ${em(16)};
   border-radius: 5px;
   display: flex;
   align-items: center;
   gap: ${em(12)};
   justify-content: space-between;
   flex-wrap: wrap;
   background: ${props => props.theme.color2 as string};
   color: ${props => props.theme.color4 as string};
   transition: 0.3s;
   @media (hover: hover) {
      &:hover {
         background: ${props => props.theme.color3 as string};
      }
   }
   @media (${md(layout.md3)}) {
      justify-content: center;
      padding: 0 ${em(16)};
   }
   span {
      font-size: ${em(24)};
      @media (${md(layout.md3)}) {
         display: none;
      }
   }
   svg {
      @media (${md(layout.md3, 'min')}) {
         font-size: 1.5em;
         padding-top: 0;
         padding-bottom: 0;
      }
      ${IconButtonStyles}
   }
`;
const QuestionsBox = () => {
   const [items, setItems] = useState<number[]>([]);

   const handleAddQuestion = () => {
      setItems(items => [...items, items.length + 1]);
   };

   return (
      <QuestionsBoxEl>
         <QuestionsDnD items={items} setItems={setItems} />
         <AddQuestionButton type='button' onClick={handleAddQuestion}>
            <span>Create new question</span>
            <FontAwesomeIcon icon={faPlus} />
         </AddQuestionButton>
      </QuestionsBoxEl>
   );
};
export default QuestionsBox;
