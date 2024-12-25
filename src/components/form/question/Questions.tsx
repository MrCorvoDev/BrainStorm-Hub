import Accordion from '../../accordion/Accordion';
import AccordionGroup from '../../accordion/AccordionGroup';
import QuestionDnD from './QuestionDnD';
import {useQuestions} from './QuestionsBox';

const Questions = () => {
   const {orderArray} = useQuestions();

   return (
      <AccordionGroup>
         {orderArray.map(id => (
            <Accordion key={id}>
               <QuestionDnD id={id} />
            </Accordion>
         ))}
      </AccordionGroup>
   );
};
export default Questions;
