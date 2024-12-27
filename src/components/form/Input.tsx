import {InputHTMLAttributes} from 'react';
import {FieldError, useFormContext} from 'react-hook-form';
import styled from 'styled-components';

import em from '../../styles/utils/em';

const InputFontSize = 21;
const InputEl = styled.input<{$error: FieldError | undefined}>`
   font-size: ${em(InputFontSize)};
   min-height: ${em(64, InputFontSize)};
   padding: 0 ${em(20, InputFontSize)};
   color: ${props => props.theme.color4 as string};
   background: transparent;
   border: 2px solid ${props => (props.$error ? 'red' : 'currentColor')};
   border-radius: 5px;
   width: 100%;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   placeholder?: string | undefined;
   required?: boolean;
}
const Input = ({name, placeholder, required = true, ...rest}: InputProps) => {
   const {
      register,
      formState: {errors},
   } = useFormContext();

   return (
      <InputEl
         {...register(name, {required})}
         $error={errors[name] as FieldError | undefined}
         placeholder={placeholder}
         {...rest}
      />
   );
};
export default Input;
