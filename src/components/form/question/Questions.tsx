import AccordionGroupProvider from '../../../contexts/AccordionGroupProvider';
import AccordionProvider from '../../../contexts/AccordionProvider';
import useQuestions from '../../../hooks/useQuestions';
import QuestionDnD from './QuestionDnD';

const Questions = () => {
   const {orderArray} = useQuestions();

   return (
      <AccordionGroupProvider>
         {orderArray.map(id => (
            <AccordionProvider key={id}>
               <QuestionDnD id={id} />
            </AccordionProvider>
         ))}
      </AccordionGroupProvider>
   );
};
export default Questions;
