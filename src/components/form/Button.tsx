import styled from 'styled-components';

import ButtonStyles from '../../styles/ButtonStyles';
import {ReactChildrenType} from '../../types/global';

const ButtonEl = styled.button`
   ${ButtonStyles}
`;

interface ButtonProps {
   type?: 'button' | 'submit' | 'reset';
   className?: string;
   children: ReactChildrenType;
}
const Button = ({type = 'button', className, children}: ButtonProps) => (
   <ButtonEl type={type} className={className}>
      {children}
   </ButtonEl>
);
export default Button;
