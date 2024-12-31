import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useMemo} from 'react';

import useAccordion from '../../../hooks/useAccordion';
import useQuestions from '../../../hooks/useQuestions';
import Question from './Question';

interface QuestionDnDProps {
   id: string;
}
const QuestionDnD = ({id}: QuestionDnDProps) => {
   const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({id});

   const style = {
      transform: CSS.Translate.toString(transform),
      transition,
   };

   const {validateOpenedQuestionFn, clearDefaultOpenedQuestion} =
      useQuestions();

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
                  clearDefaultOpenedQuestion();
                  toggle();
               }
               (listenerFn as (event: Event) => void)(event);
            };
            return acc;
         }, {} as SyntheticListenerMap),
      [
         isOpened,
         listeners,
         toggle,
         validateOpenedQuestionFn,
         clearDefaultOpenedQuestion,
      ],
   );

   return (
      <div ref={setNodeRef} style={style} {...attributes}>
         <Question id={id} handleElListeners={handleElListeners}></Question>
      </div>
   );
};

export default QuestionDnD;
