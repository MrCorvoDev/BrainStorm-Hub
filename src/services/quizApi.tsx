import axios from 'axios';

const api = axios.create({
   baseURL: 'https://brainstorm-hub-server.onrender.com',
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

export const getAllQuizzes = async (): Promise<QuizType[]> => {
   try {
      const response = await api.get('/quizzes');
      return response.data as QuizType[];
   } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];
   }
};

export const getQuiz = async (id: string): Promise<QuizType> => {
   try {
      const response = await api.get(`/quizzes/${id}`);
      return response.data as QuizType;
   } catch (error) {
      console.error('Error fetching quiz:', error);
      return {} as QuizType;
   }
};
