import AccordionGroupProvider from '../../../contexts/AccordionGroupProvider';
import AccordionProvider from '../../../contexts/AccordionProvider';
import useQuestions from '../../../hooks/useQuestions';
import QuestionDnD from './QuestionDnD';

const Questions = () => {
   const {orderArray} = useQuestions();
   const {questions} = useQuestions();

   return (
      <AccordionGroupProvider>
         {orderArray.map((id, i) => (
            <AccordionProvider
               key={id}
               defaultOpened={
                  orderArray.length - 1 === i &&
                  questions.find(question => question.id === id)?.defaultOpened
               }
            >
               <QuestionDnD id={id} isLast={i === orderArray.length - 1} />
            </AccordionProvider>
         ))}
      </AccordionGroupProvider>
   );
};
export default Questions;
