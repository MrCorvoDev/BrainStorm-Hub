import {nanoid} from 'nanoid';
import {FormEvent} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import Section from '../components/core/Section';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import QuestionsBox from '../components/form/question/QuestionsBox';
import QuestionsProvider from '../contexts/QuestionsContext';
import useQuestions from '../hooks/useQuestions';
import {createQuiz, QuestionType} from '../services/quizApi';
import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const HeadlineFontsize = 32;
const Headline = styled.h1`
   font-size: ${em(HeadlineFontsize)};
   font-weight: 700;
   margin-bottom: ${em(32, HeadlineFontsize)};
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: ${em(16)};
`;

const Grid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: ${em(16)};
   width: 100%;
   @media (${md(layout.md3)}) {
      grid-template-columns: 1fr;
   }
`;

const CreateQuizEl = () => {
   const navigate = useNavigate();
   const methods = useForm();
   const {validateOpenedQuestionFn} = useQuestions();

   const onSubmit = async (data: FieldValues, questions: QuestionType[]) => {
      const newData = {
         verified: false,
         id: nanoid(),
         name: data.name as string,
         description: data.description as string,
         questions,
      };

      if (!questions.length) return;

      await createQuiz(newData);
      await navigate('/');
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await validateOpenedQuestionFn(async updatedQuestions => {
         await methods.handleSubmit(data => onSubmit(data, updatedQuestions))(
            e,
         );
      });
   };

   return (
      <Section>
         <div className='container'>
            <Headline>Create a Quiz</Headline>
            <FormProvider {...methods}>
               <Form onSubmit={e => void handleSubmit(e)}>
                  <Grid>
                     <Label title='Quiz Name'>
                        <Input name='name' />
                     </Label>
                     <Label title='Quiz Description'>
                        <Input name='description' />
                     </Label>
                  </Grid>
                  <QuestionsBox />
                  <Grid>
                     <Button type='submit'>
                        <span>Submit</span>
                     </Button>
                  </Grid>
               </Form>
            </FormProvider>
         </div>
      </Section>
   );
};

const CreateQuiz = () => (
   <QuestionsProvider>
      <CreateQuizEl />
   </QuestionsProvider>
);

export default CreateQuiz;
