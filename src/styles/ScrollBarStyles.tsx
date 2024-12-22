import {css} from 'styled-components';

import rem from './utils/rem';

const ScrollBarStyles = css`
   ::-webkit-scrollbar {
      width: ${rem(6)};
      height: ${rem(6)};
   }
   ::-webkit-scrollbar-track {
      border-radius: ${rem(10)};
      background: rgba(#fff, 0.1);
   }
   ::-webkit-scrollbar-thumb {
      border-radius: ${rem(10)};
      background: rgba(#fff, 0.2);
   }
   ::-webkit-scrollbar-thumb:hover {
      background: rgba(#fff, 0.4);
   }
   ::-webkit-scrollbar-thumb:active {
      background: rgba(#fff, 0.9);
   }
`;

export default ScrollBarStyles;