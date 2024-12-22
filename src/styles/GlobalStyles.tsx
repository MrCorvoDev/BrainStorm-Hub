import {createGlobalStyle} from 'styled-components';

import CoreStyles from './CoreStyles';
import NullStyles from './NullStyles';
import ScrollBarStyles from './ScrollBarStyles';

const GlobalStyles = createGlobalStyle`
   ${NullStyles}
   ${CoreStyles}
   ${ScrollBarStyles}
`;

export default GlobalStyles;
