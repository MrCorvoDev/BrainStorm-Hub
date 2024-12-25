import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {
   faEdit,
   faGripVertical,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import IconButtonStyles from '../../../styles/IconButtonStyles';
import em from '../../../styles/utils/em';
import {useAccordion} from '../../accordion/Accordion';
import AccordionContent from '../../accordion/AccordionContent';
import CreateQuestion from './CreateQuestion';
import {useQuestions} from './QuestionsBox';

const QuestionEl = styled.div`
   padding: ${em(24)} ${em(8)};
   border: 2px solid ${props => props.theme.color4 as string};
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

const IconButton = styled.button`
   ${IconButtonStyles}
`;

const Content = styled.div`
   padding: 0 ${em(8)};
   padding-top: ${em(32)};
`;

interface QuestionProps {
   id: string;
   handleElListeners: SyntheticListenerMap | undefined;
}
const Question = ({id, handleElListeners}: QuestionProps) => {
   const {questions, setOrderArray, validateOpenedQuestionFn} = useQuestions();
   const {toggle} = useAccordion();

   const handleEdit = () => {
      (async () => {
         const isSafeToContinue = await validateOpenedQuestionFn();
         if (!isSafeToContinue) return;

         toggle();
      })().catch(console.error);
   };

   const handleDelete = () => {
      setOrderArray(orderArray => orderArray.filter(itemId => itemId !== id));
   };

   const item = questions.find(question => question.id === id);

   return (
      <QuestionEl>
         <Head>
            <Flex>
               <Handle type='button' {...handleElListeners}>
                  <FontAwesomeIcon icon={faGripVertical} />
               </Handle>
               <span>{item?.question}</span>
            </Flex>
            <IconContainer>
               <IconButton onClick={handleEdit} type='button'>
                  <FontAwesomeIcon icon={faEdit} />
               </IconButton>
               <IconButton onClick={handleDelete} type='button'>
                  <FontAwesomeIcon icon={faTrash} />
               </IconButton>
            </IconContainer>
         </Head>
         <AccordionContent>
            <Content>
               <CreateQuestion item={item!} />
            </Content>
         </AccordionContent>
      </QuestionEl>
   );
};

export default Question;
