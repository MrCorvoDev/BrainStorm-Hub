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

interface QuestionsDnDProps {
   items: number[];
   setItems: React.Dispatch<React.SetStateAction<number[]>>;
}
const QuestionsDnD = ({items, setItems}: QuestionsDnDProps) => {
   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   );

   const handleDragEnd = (event: DragEndEvent) => {
      const {active, over} = event;

      if (active.id !== over?.id) {
         setItems(items => {
            const oldIndex = items.indexOf(Number(active.id));
            const newIndex = items.indexOf(Number(over?.id));

            return arrayMove(items, oldIndex, newIndex);
         });
      }
   };

   return (
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
      >
         <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Questions items={items} setItems={setItems} />
         </SortableContext>
      </DndContext>
   );
};

export default QuestionsDnD;
