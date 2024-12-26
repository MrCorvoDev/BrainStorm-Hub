import axios from 'axios';

const api = axios.create({
   baseURL: 'https://server.mister-corvo.com/brainstorm-hub',
});

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
export interface QuizType {
   id: string;
   name: string;
   description: string;
   questions: QuestionType[];
}
export const createQuiz = async (quiz: QuizType) => {
   try {
      await api.post('/quizzes', quiz);
   } catch (error) {
      console.error('Error creating quiz:', error);
   }
};

export const quizzesURL = '/quizzes';

export const getAllQuizzes = async (): Promise<QuizType[]> => {
   try {
      const response = await api.get(quizzesURL);
      return response.data as QuizType[];
   } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];
   }
};

export const getQuiz = async (id: string): Promise<QuizType> => {
   try {
      const response = await api.get(`${quizzesURL}/${id}`);
      return response.data as QuizType;
   } catch (error) {
      console.error('Error fetching quiz:', error);
      return {} as QuizType;
   }
};
