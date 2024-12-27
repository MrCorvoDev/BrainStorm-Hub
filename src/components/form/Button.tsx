import {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';

import ButtonStyles from '../../styles/ButtonStyles';
import {ReactChildrenType} from '../../types/global';

const ButtonEl = styled.button`
   ${ButtonStyles}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   type?: 'button' | 'submit' | 'reset';
   children: ReactChildrenType;
}
const Button = ({type = 'button', children, ...props}: ButtonProps) => (
   <ButtonEl type={type} {...props}>
      {children}
   </ButtonEl>
);
export default Button;
