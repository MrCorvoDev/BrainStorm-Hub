import {createContext, useContext, useState} from 'react';

import {QuestionType} from '../../../services/quizApi';
import {ReactPropsChildrenType} from '../../../types/global';

export type useChangedQuestionsType = (
   questions: QuestionType[],
) => Promise<void>;

interface questionsInitContext {
   questions: QuestionType[];
   setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
   orderArray: string[];
   setOrderArray: React.Dispatch<React.SetStateAction<string[]>>;
   validateOpenedQuestionFn: (
      fn?: useChangedQuestionsType,
   ) => Promise<boolean> | boolean;
   setValidateOpenedQuestionFn: React.Dispatch<
      React.SetStateAction<
         (fn?: useChangedQuestionsType) => Promise<boolean> | boolean
      >
   >;
}
const initContext: questionsInitContext = {
   questions: [],
   setQuestions: () => void 0,
   orderArray: [],
   setOrderArray: () => void 0,
   validateOpenedQuestionFn: () => true,
   setValidateOpenedQuestionFn: () => void 0,
};

const QuestionsContext = createContext<questionsInitContext>(initContext);
export const useQuestions = () => useContext(QuestionsContext);

const QuestionsProvider = ({children}: ReactPropsChildrenType) => {
   const [questions, setQuestions] = useState<QuestionType[]>([]);
   const [orderArray, setOrderArray] = useState<string[]>([]);
   const [validateOpenedQuestionFn, setValidateOpenedQuestionFn] = useState<
      (fn?: useChangedQuestionsType) => Promise<boolean> | boolean
   >(() => () => true); // Default function returning a resolved Promise<boolean>

   return (
      <QuestionsContext.Provider
         value={{
            questions,
            setQuestions,
            orderArray,
            setOrderArray,
            validateOpenedQuestionFn,
            setValidateOpenedQuestionFn,
         }}
      >
         {children}
      </QuestionsContext.Provider>
   );
};
export default QuestionsProvider;
