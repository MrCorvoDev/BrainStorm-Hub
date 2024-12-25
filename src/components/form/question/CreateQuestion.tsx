import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDebounce} from '@uidotdev/usehooks';
import {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';

import {OptionType, QuestionType} from '../../../services/quizApi';
import IconButtonStyles from '../../../styles/IconButtonStyles';
import {layout} from '../../../styles/theme';
import em from '../../../styles/utils/em';
import md from '../../../styles/utils/md';
import {useAccordion} from '../../accordion/Accordion';
import Input from '../Input';
import Label from '../Label';
import {useQuestions} from './QuestionsProvider';

const CreateQuestionEl = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
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

const Option = styled.div`
   display: flex;
   flex-direction: column;
   gap: ${em(12)};
`;
const OptionFlex = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;
const OptionLabel = styled.label`
   font-size: ${em(24)};
`;

const DeleteButton = styled.button`
   ${IconButtonStyles}
`;

const AddOptionButtonFS = 21;
const AddOptionButton = styled.button`
   font-size: ${em(AddOptionButtonFS)};
   min-height: ${em(64, AddOptionButtonFS)};
   padding: ${em(5, AddOptionButtonFS)};
   background: ${props => props.theme.color2 as string};
   border: 2px solid ${props => props.theme.color2 as string};
   border-radius: 5px;
   align-self: end;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: 0.3s;
   @media (hover: hover) {
      &:hover {
         background: ${props => props.theme.color3 as string};
         border: 2px solid ${props => props.theme.color3 as string};
      }
   }
`;

const SelectFontSize = 21;
const SelectStylesContainer = styled.div`
   .react-select__control {
      font-size: ${em(SelectFontSize)};
      min-height: ${em(64, SelectFontSize)};
      padding: 0 ${em(20, SelectFontSize)};
      background: transparent;
      border: 2px solid currentColor;
      border-radius: 5px;
      width: 100%;
      @media (hover: hover) {
         &:hover {
            border-color: currentColor;
         }
      }
   }
   .react-select__indicator svg {
      transition: 0.3s;
   }
   .react-select__control--is-focused {
      box-shadow: none;
      outline-color: white !important;
      outline-offset: 0px !important;
      outline-style: auto !important;
      outline-width: 1px !important;
      .react-select__indicator svg {
         fill: ${props => props.theme.color4 as string};
         stroke: ${props => props.theme.color4 as string};
      }
   }
   .react-select__control--menu-is-open .react-select__indicator svg {
      transform: rotate(180deg);
   }
   .react-select__indicator-separator {
      display: none;
   }
   .react-select__single-value {
      color: currentColor;
   }
   .react-select__menu {
      background: ${props => props.theme.color1 as string};
      border: 2px solid currentColor;
   }
   .react-select__option {
      padding: 0 ${em(20, SelectFontSize)};
      min-height: ${em(48, SelectFontSize)};
      display: flex;
      align-items: center;
      @media (hover: hover) {
         &:hover {
            background: ${props => props.theme.color3 as string};
         }
      }
   }
   .react-select__option--is-selected {
      background: ${props => props.theme.color2 as string};
   }
   .react-select__option--is-focused {
      background: ${props => props.theme.color3 as string};
   }
`;

const getInputNames = (question: QuestionType) => {
   const id = question.id;

   const inputNames = question.options.map(
      (_, index) => `${id}-options-${index}`,
   );
   inputNames.push(`${id}-question`);
   inputNames.push(`${id}-answer`);

   return inputNames;
};

interface CreateQuestionProps {
   item: QuestionType;
}
const CreateQuestion = ({item}: CreateQuestionProps) => {
   const [question, setQuestion] = useState(item.question);
   const [options, setOptions] = useState<OptionType[]>(item.options);
   const debouncedOptions = useDebounce(options, 300);
   const [answer, setAnswer] = useState(item.answer);

   const {control, trigger} = useFormContext();

   const {isOpened} = useAccordion();
   const {setValidateOpenedQuestionFn, setQuestions} = useQuestions();

   useEffect(() => {
      if (isOpened) {
         const currentQuestion: QuestionType = {
            id: item.id,
            question,
            answer,
            options,
         };

         setValidateOpenedQuestionFn(() => async () => {
            const isValid = await trigger(getInputNames(currentQuestion));
            if (!isValid) return isValid;

            setQuestions(prev => {
               const updatedQuestions = [...prev];
               const questionIndex = updatedQuestions.findIndex(
                  q => q.id === item.id,
               );
               updatedQuestions[questionIndex] = {
                  ...updatedQuestions[questionIndex],
                  ...currentQuestion,
               };
               return updatedQuestions;
            });

            return isValid;
         });
      } else setValidateOpenedQuestionFn(() => () => true);
   }, [
      isOpened,
      answer,
      options,
      question,
      setValidateOpenedQuestionFn,
      item.id,
      trigger,
      setQuestions,
   ]);

   const handleOptionChange = (index: number, value: string) => {
      const originalAnswerIndex = options.findIndex(
         option => option.value === answer.value,
      );
      const updatedOptions = [...options];
      updatedOptions[index] = {
         value: value.toLowerCase().trim(),
         label: value,
      };

      if (
         updatedOptions.find(option => option.value === answer.value) ===
         undefined
      ) {
         setAnswer(updatedOptions[originalAnswerIndex]);
      }
      setOptions(updatedOptions);
   };

   const handleDelete = (index: number) => {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
   };

   const addOption = () => {
      const updatedOptions = [...options, {value: '', label: ''}];
      setOptions(updatedOptions);
   };

   return (
      <CreateQuestionEl>
         <Grid>
            <Label title='Question'>
               <Input
                  name={`${item.id}-question`}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
               />
            </Label>
            <Label title='Answer'>
               <Controller
                  name={`${item.id}-answer`}
                  control={control}
                  defaultValue={answer}
                  rules={{required: 'Answer is required'}}
                  render={({field}) => (
                     <SelectStylesContainer>
                        <Select
                           {...field}
                           className='react-select'
                           classNamePrefix='react-select'
                           isSearchable={false}
                           options={debouncedOptions}
                           value={answer}
                           onChange={value => setAnswer(value!)}
                        />
                     </SelectStylesContainer>
                  )}
               />
            </Label>
         </Grid>
         <Grid>
            {options.map((option, index) => (
               <Option key={index}>
                  <OptionFlex>
                     <OptionLabel htmlFor={`${item.id}-options-${index}`}>
                        Option {index + 1}
                     </OptionLabel>
                     {index > 1 && (
                        <DeleteButton
                           onClick={() => handleDelete(index)}
                           type='button'
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                     )}
                  </OptionFlex>
                  <Input
                     id={`${item.id}-options-${index}`}
                     name={`${item.id}-options-${index}`}
                     value={option.label}
                     onChange={e => handleOptionChange(index, e.target.value)}
                  />
               </Option>
            ))}
            <AddOptionButton type='button' onClick={addOption}>
               <FontAwesomeIcon icon={faPlus} />
            </AddOptionButton>
         </Grid>
      </CreateQuestionEl>
   );
};
export default CreateQuestion;
