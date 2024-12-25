import {
   closestCenter,
   DndContext,
   DragEndEvent,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
} from '@dnd-kit/core';
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import Questions from './Questions';
import {useQuestions} from './QuestionsBox';

const QuestionsDnD = () => {
   const {orderArray, setOrderArray} = useQuestions();

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   );

   const handleDragEnd = (event: DragEndEvent) => {
      const {active, over} = event;

      if (active.id !== over?.id) {
         setOrderArray(orderArray => {
            const oldIndex = orderArray.indexOf(active.id as string);
            const newIndex = orderArray.indexOf(over?.id as string);

            return arrayMove(orderArray, oldIndex, newIndex);
         });
      }
   };

   return (
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
      >
         <SortableContext
            items={orderArray}
            strategy={verticalListSortingStrategy}
         >
            <Questions />
         </SortableContext>
      </DndContext>
   );
};

export default QuestionsDnD;
