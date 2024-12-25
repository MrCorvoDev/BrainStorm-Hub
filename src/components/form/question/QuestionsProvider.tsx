import {createContext, useContext, useState} from 'react';

import {ReactPropsChildrenType} from '../../../types/global';

export interface OptionType {
   value: string;
   label: string;
}
export interface QuestionType {
   id: string;
   question: string;
   options: OptionType[];
   answer: OptionType;
}

interface questionsInitContext {
   questions: QuestionType[];
   setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
   orderArray: string[];
   setOrderArray: React.Dispatch<React.SetStateAction<string[]>>;
   validateOpenedQuestionFn: () => Promise<boolean> | (() => boolean);
   setValidateOpenedQuestionFn: React.Dispatch<
      React.SetStateAction<() => Promise<boolean> | (() => boolean)>
   >;
}
const initContext: questionsInitContext = {
   questions: [],
   setQuestions: () => void 0,
   orderArray: [],
   setOrderArray: () => void 0,
   validateOpenedQuestionFn: () => () => true,
   setValidateOpenedQuestionFn: () => void 0,
};

const QuestionsContext = createContext<questionsInitContext>(initContext);
export const useQuestions = () => useContext(QuestionsContext);

const QuestionsProvider = ({children}: ReactPropsChildrenType) => {
   const [questions, setQuestions] = useState<QuestionType[]>([]);
   const [orderArray, setOrderArray] = useState<string[]>([]);
   const [validateOpenedQuestionFn, setValidateOpenedQuestionFn] = useState<
      () => Promise<boolean> | (() => boolean)
   >(() => () => true);

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
