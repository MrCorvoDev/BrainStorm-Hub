import {createGlobalStyle} from 'styled-components';

import CoreStyles from './CoreStyles';
import NullStyles from './NullStyles';

const GlobalStyles = createGlobalStyle`
   ${NullStyles}
   ${CoreStyles}
`;

export default GlobalStyles;
