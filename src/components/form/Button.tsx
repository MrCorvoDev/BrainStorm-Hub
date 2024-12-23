import styled from 'styled-components';

import em from '../../styles/utils/em';
import {ReactChildrenType} from '../../types/global';

const ButtonFontSize = 24;
const ButtonEl = styled.button`
   font-size: ${em(ButtonFontSize)};
   min-height: ${em(64, ButtonFontSize)};
   padding: 0 ${em(20, ButtonFontSize)};
   border-radius: 5px;
   background-color: ${props => props.theme.color2 as string};
   transition: 0.3s;
   @media (hover: hover) {
      &:hover {
         background-color: ${props => props.theme.color3 as string};
      }
   }
`;

interface ButtonProps {
   type?: 'button' | 'submit' | 'reset';
   children: ReactChildrenType;
}
const Button = ({type = 'button', children}: ButtonProps) => (
   <ButtonEl type={type}>{children}</ButtonEl>
);
export default Button;
