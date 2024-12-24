import {css} from 'styled-components';

import {layout} from './theme';
import em from './utils/em';
import md from './utils/md';

const IconButtonStyles = css`
   padding: ${em(8)};
   @media (${md(layout.md3)}) {
      font-size: 1.4em;
   }
   svg {
      transition: 0.3s;
   }
   @media (hover: hover) {
      &:hover {
         svg {
            transform: scale(1.15);
         }
      }
   }
`;

export default IconButtonStyles;
