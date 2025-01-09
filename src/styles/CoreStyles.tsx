import {css} from 'styled-components';

import {layout} from './theme';
import dc from './utils/dc';
import fontSize from './utils/fontSize';
import lockPadding from './utils/lockPadding';
import maxWidth from './utils/maxWidth';
import md from './utils/md';
import rem from './utils/rem';

const headerHeight = dc(layout.headerHeights.pc, layout.headerHeights.mobile);
const headerStickyHeight = dc(
   layout.headerHeights.stickyPc,
   layout.headerHeights.stickyMobile,
);

const CoreStyles = css`
   :root {
      --headerH: ${headerHeight};
      --headerSH: ${headerStickyHeight};
   }

   [id] {
      scroll-margin-top: var(--headerH);
   }

   body {
      background: ${({theme: {backgroundColor}}) => backgroundColor as string};
      color: ${({theme: {color}}) => color as string};

      ${fontSize(layout.fontSize.pc, layout.fontSize.mobile)}
      font-family: ${({theme: {fontFamily}}) => fontFamily as string};

      min-width: ${rem(layout.minWidth)};
      ${lockPadding()}
   }

   #app {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
   }

   #content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
   }

   .container {
      ${maxWidth(layout.container, layout.designWidth)}
      margin: 0 auto;
      width: 100%;
      @media (${md(layout.md1)}) {
         max-width: ${rem(layout.cnt1)};
      }
      @media (${md(layout.md2)}) {
         max-width: ${rem(layout.cnt2)};
      }
      @media (${md(layout.md3)}) {
         max-width: none;
         padding: 0 ${rem(12)};
      }
   }

   // *:not(.keep-anim) (Включить при надобности)
   body.resize * {
      animation: none !important;
      transition: none !important;
   }
`;
export default CoreStyles;
