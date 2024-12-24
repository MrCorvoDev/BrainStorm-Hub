import Accordion from '../../accordion/Accordion';
import AccordionGroup from '../../accordion/AccordionGroup';
import QuestionDnD from './QuestionDnD';

interface QuestionsProps {
   items: number[];
   setItems: React.Dispatch<React.SetStateAction<number[]>>;
}
const Questions = ({items, setItems}: QuestionsProps) => (
   <AccordionGroup>
      {items.map(id => (
         <Accordion key={id}>
            <QuestionDnD setItems={setItems} id={id} />
         </Accordion>
      ))}
   </AccordionGroup>
);
export default Questions;
