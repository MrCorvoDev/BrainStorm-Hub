import axios from 'axios';

const api = axios.create({
   baseURL: 'https://brainstorm-hub-server.onrender.com',
});

export interface QuizQuestionType {
   type: 'boolean' | 'multiple';
   question: string;
   options: string[];
   answer: string;
}
export interface QuizType {
   author: string;
   title: string;
   description: string;
   questions: QuizQuestionType[];
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
