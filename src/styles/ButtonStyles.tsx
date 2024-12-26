import {css} from 'styled-components';

import em from './utils/em';

const ButtonStyles = css`
   min-height: ${em(64)};
   padding: 0 ${em(20)};
   border-radius: 5px;
   background-color: ${props => props.theme.color2 as string};
   transition: 0.3s;
   span {
      font-size: ${em(24)};
   }
   @media (hover: hover) {
      &:hover {
         background-color: ${props => props.theme.color3 as string};
      }
   }
`;

export default ButtonStyles;
