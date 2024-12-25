import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useMemo} from 'react';

import {useAccordion} from '../../accordion/Accordion';
import Question from './Question';
import {useQuestions} from './QuestionsProvider';

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
               if (isOpened) toggle();
               (listenerFn as (event: Event) => void)(event);
            };
            return acc;
         }, {} as SyntheticListenerMap),
      [isOpened, listeners, toggle, validateOpenedQuestionFn],
   );

   return (
      <div ref={setNodeRef} style={style} {...attributes}>
         <Question id={id} handleElListeners={handleElListeners}></Question>
      </div>
   );
};

export default QuestionDnD;
