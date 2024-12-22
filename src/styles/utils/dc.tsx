import {layout} from '../theme';
import rem from './rem';

const dc = (pcSize: number, mobileSize: number, viewport = '100vw') => {
   const addSize = pcSize - mobileSize;
   const range = layout.designWidth - layout.minWidth;

   return `calc(${rem(mobileSize)} + (${rem(addSize, false)} * ((max(${rem(layout.minWidth)}, ${viewport}) - ${rem(layout.minWidth)}) / ${rem(range, false)})))`;
};

export default dc;
