import {DefaultTheme} from 'styled-components';

const CONTAINER = 1258;

const breakpoints = {
   md1: CONTAINER + 12,
   md2: 1024,
   md3: 768,
   md4: 480,
};

const CONTAINER_SIZES = {
   cnt1: 970,
   cnt2: 750,
};

const fontSize = {
   default: 16,
   pc: 20,
   mobile: 16,
};

export const layout = {
   designWidth: 1440,
   minWidth: 320,
   container: CONTAINER,
   ...breakpoints,
   ...CONTAINER_SIZES,
   fontSize,
   headerHeights: {
      pc: 80,
      mobile: 50,
      stickyPc: 50,
      stickyMobile: 40,
   },
};

//! Avoid imports of this const, theme might change dynamically. Try recommended styled-components method or useTheme hook
const theme: DefaultTheme = {
   ...layout,
   fontFamily: 'Unbounded, serif',
   color: '#fff',
   backgroundColor: '#000',
};

export default theme;
