import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useMemo} from 'react';
import styled, {css} from 'styled-components';

import useAccordion from '../../../hooks/useAccordion';
import useQuestions from '../../../hooks/useQuestions';
import em from '../../../styles/utils/em';
import Question from './Question';

const QuestionDnDEl = styled.div<{$isLast?: boolean}>`
   ${({$isLast}) =>
      !$isLast &&
      css`
         position: relative;
         &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: calc(100% - ${em(32)});
            height: 2px;
            border-radius: 1px;
            background: ${props => props.theme.color4 as string};
         }
      `}
`;

interface QuestionDnDProps {
   id: string;
   isLast?: boolean;
}
const QuestionDnD = ({id, isLast}: QuestionDnDProps) => {
   const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({id});

   const style = {
      transform: CSS.Translate.toString(transform),
      transition,
   };

   const {validateOpenedQuestionFn} = useQuestions();

   const {toggle, isOpened} = useAccordion();

   const handleElListeners = useMemo(
      () =>
         listeners &&
         Object.keys(listeners).reduce((acc, key) => {
            const listenerFn = listeners[key];
            acc[key] = async (event: Event) => {
               const isSaveToContinue = await validateOpenedQuestionFn();
               if (!isSaveToContinue) return;
               if (isOpened) {
                  toggle();
               }
               (listenerFn as (event: Event) => void)(event);
            };
            return acc;
         }, {} as SyntheticListenerMap),
      [isOpened, listeners, toggle, validateOpenedQuestionFn],
   );

   return (
      <QuestionDnDEl
         ref={setNodeRef}
         style={style}
         {...attributes}
         className='question-dnd'
         $isLast={isLast}
      >
         <Question id={id} handleElListeners={handleElListeners}></Question>
      </QuestionDnDEl>
   );
};

export default QuestionDnD;
