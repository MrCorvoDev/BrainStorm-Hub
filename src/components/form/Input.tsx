import {FieldError, FieldValues, UseFormRegister} from 'react-hook-form';
import styled from 'styled-components';

import em from '../../styles/utils/em';

const InputFontSize = 21;
const InputEl = styled.input<{$error: FieldError | undefined}>`
   font-size: ${em(InputFontSize)};
   min-height: ${em(64, InputFontSize)};
   padding: 0 ${em(20, InputFontSize)};
   color: ${props => props.theme.color4 as string};
   background: transparent;
   border: 2px solid
      ${props => (props.$error ? 'red' : (props.theme.color4 as string))};
   border-radius: 5px;
   width: 100%;
`;

interface InputProps {
   name: string;
   register: UseFormRegister<FieldValues>;
   error: FieldError | undefined;
   placeholder?: string | undefined;
   required?: boolean;
}
const Input = ({
   name,
   register,
   error,
   placeholder,
   required = true,
}: InputProps) => (
   <InputEl
      {...register(name, {required})}
      $error={error}
      placeholder={placeholder}
   />
);
export default Input;
