import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {
   faEdit,
   faGripVertical,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import styled from 'styled-components';

import IconButtonStyles from '../../../styles/IconButtonStyles';
import em from '../../../styles/utils/em';
import AccordionButton from '../../accordion/AccordionButton';
import AccordionContent from '../../accordion/AccordionContent';
import CreateQuestion from './CreateQuestion';

const QuestionEl = styled.div`
   padding: ${em(24)} ${em(8)};
   border: 1px solid ${props => props.theme.color4 as string};
   border-radius: 5px;
`;

const Head = styled.div`
   display: flex;
   align-items: center;
   gap: ${em(24)};
`;

const Flex = styled.div`
   display: flex;
   gap: ${em(8)};
   align-items: center;
   flex: 1 1 auto;
   overflow: hidden;
   span {
      font-size: ${em(24)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
`;

const Handle = styled.button`
   ${IconButtonStyles}
   cursor: grab;
   &:active {
      cursor: grabbing;
   }
`;

const IconContainer = styled.div`
   display: flex;
   align-items: center;
`;

const EditButton = styled(AccordionButton)`
   ${IconButtonStyles}
`;

const DeleteButton = styled.button`
   ${IconButtonStyles}
`;

const Content = styled.div`
   padding: 0 ${em(8)};
   padding-top: ${em(16)};
`;

interface QuestionProps {
   setItems: React.Dispatch<React.SetStateAction<number[]>>;
   id: number;
   handleElListeners: SyntheticListenerMap | undefined;
}
const Question = ({setItems, id, handleElListeners}: QuestionProps) => {
   const [questionName, setQuestionName] = useState<string>('New Question');
   const handleDelete = () => {
      setItems(items => items.filter(itemId => itemId !== id));
   };

   return (
      <QuestionEl>
         <Head>
            <Flex>
               <Handle type='button' {...handleElListeners}>
                  <FontAwesomeIcon icon={faGripVertical} />
               </Handle>
               <span>{questionName}</span>
            </Flex>
            <IconContainer>
               <EditButton>
                  <FontAwesomeIcon icon={faEdit} />
               </EditButton>
               <DeleteButton onClick={handleDelete} type='button'>
                  <FontAwesomeIcon icon={faTrash} />
               </DeleteButton>
            </IconContainer>
         </Head>
         <AccordionContent>
            <Content>
               <CreateQuestion
                  questionName={questionName}
                  setQuestionName={setQuestionName}
               />
            </Content>
         </AccordionContent>
      </QuestionEl>
   );
};

export default Question;
