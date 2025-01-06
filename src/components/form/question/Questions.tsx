import AccordionProvider from '../../../contexts/AccordionContext';
import AccordionGroupProvider from '../../../contexts/AccordionGroupContext';
import useQuestions from '../../../hooks/useQuestions';
import QuestionDnD from './QuestionDnD';

const Questions = () => {
   const {orderArray} = useQuestions();
   const {questions} = useQuestions();

   return (
      <AccordionGroupProvider>
         {orderArray.map((id, i) => (
            <AccordionProvider key={id}>
               <QuestionDnD
                  id={id}
                  isLast={i === orderArray.length - 1}
                  defaultOpened={
                     orderArray.length - 1 === i &&
                     questions.find(question => question.id === id)
                        ?.defaultOpened
                  }
               />
            </AccordionProvider>
         ))}
      </AccordionGroupProvider>
   );
};
export default Questions;
