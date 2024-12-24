import {SyntheticListenerMap} from '@dnd-kit/core/dist/hooks/utilities';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useMemo} from 'react';

import {useAccordion} from '../../accordion/Accordion';
import Question from './Question';

interface QuestionDnDProps {
   setItems: React.Dispatch<React.SetStateAction<number[]>>;
   id: number;
}
const QuestionDnD = ({setItems, id}: QuestionDnDProps) => {
   const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({id: id});

   const style = {
      transform: CSS.Translate.toString(transform),
      transition,
   };

   const {toggle, isOpened} = useAccordion();
   const handleElListeners = useMemo(
      () =>
         listeners &&
         Object.keys(listeners).reduce((acc, key) => {
            const listenerFn = listeners[key];
            acc[key] = (event: Event) => {
               if (isOpened) toggle();
               (listenerFn as (event: Event) => void)(event);
            };
            return acc;
         }, {} as SyntheticListenerMap),
      [isOpened, listeners, toggle],
   );

   return (
      <div ref={setNodeRef} style={style} {...attributes}>
         <Question
            setItems={setItems}
            id={id}
            handleElListeners={handleElListeners}
         ></Question>
      </div>
   );
};

export default QuestionDnD;
