import {css} from 'styled-components';

import dc from './dc';
import em from './em';
import rem from './rem';

const fontSize = (
   pcSize: number,
   mobileSize: number,
   lineHeight?: number,
   letterSpacing?: number,
   viewport = '100vw',
) => css`
   font-size: ${dc(pcSize, mobileSize, viewport)};
   ${lineHeight ? `line-height: ${em(lineHeight, pcSize)};` : ''}
   ${letterSpacing ? `letter-spacing: ${rem(letterSpacing)};` : ''}
`;

export default fontSize;
