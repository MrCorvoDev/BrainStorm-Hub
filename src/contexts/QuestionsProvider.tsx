import {createContext, useState} from 'react';

import {QuestionType} from '../services/quizApi';
import {ReactPropsChildrenType} from '../types/global';

export type useChangedQuestionsType = (
   questions: QuestionType[],
) => Promise<void>;

interface questionsInitContext {
   questions: QuestionType[];
   setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
   orderArray: string[];
   setOrderArray: React.Dispatch<React.SetStateAction<string[]>>;
   validateOpenedQuestionFn: (fn?: useChangedQuestionsType) => Promise<boolean>;
   setValidateOpenedQuestionFn: React.Dispatch<
      React.SetStateAction<(fn?: useChangedQuestionsType) => Promise<boolean>>
   >;
   defaultValidateOpenedQuestionFn: () => (
      fn?: useChangedQuestionsType,
   ) => Promise<boolean>;
   clearDefaultOpenedQuestion: () => void;
}
export const QuestionsContext = createContext({} as questionsInitContext);

const QuestionsProvider = ({children}: ReactPropsChildrenType) => {
   const [questions, setQuestions] = useState<QuestionType[]>([]);
   const [orderArray, setOrderArray] = useState<string[]>([]);

   const defaultValidateOpenedQuestionFn =
      () => async (handleChangedQuestions?: useChangedQuestionsType) => {
         if (typeof handleChangedQuestions === 'function') {
            await handleChangedQuestions(questions);
         }

         return true;
      };
   const [validateOpenedQuestionFn, setValidateOpenedQuestionFn] = useState<
      (fn?: useChangedQuestionsType) => Promise<boolean>
   >(defaultValidateOpenedQuestionFn);

   const clearDefaultOpenedQuestion = () => {
      const updatedQuestions = [...questions];
      const lastIndex = updatedQuestions.length - 1;
      updatedQuestions[lastIndex] = {
         ...updatedQuestions[lastIndex],
         defaultOpened: false,
      };
      setQuestions(updatedQuestions);
   };

   return (
      <QuestionsContext.Provider
         value={{
            questions,
            setQuestions,
            orderArray,
            setOrderArray,
            validateOpenedQuestionFn,
            setValidateOpenedQuestionFn,
            defaultValidateOpenedQuestionFn,
            clearDefaultOpenedQuestion,
         }}
      >
         {children}
      </QuestionsContext.Provider>
   );
};
export default QuestionsProvider;
