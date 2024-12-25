import {
   FieldValues,
   FormProvider,
   SubmitHandler,
   useForm,
} from 'react-hook-form';
import styled from 'styled-components';

import Button from '../components/form/Button';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import QuestionsBox from '../components/form/question/QuestionsBox';
import QuestionsProvider from '../components/form/question/QuestionsProvider';
import Section from '../components/Section';
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
   const methods = useForm();

   const onSubmit: SubmitHandler<FieldValues> = async data => {
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 100));
   };

   return (
      <Section>
         <div className='container'>
            <Headline>Create a Quiz</Headline>
            <FormProvider {...methods}>
               <Form
                  onSubmit={event => void methods.handleSubmit(onSubmit)(event)}
               >
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
                     <Button type='submit'>Submit</Button>
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
