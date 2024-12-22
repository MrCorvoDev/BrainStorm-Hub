import getPercent from '../../utils/getPercent';
import {layout} from '../theme';

const em = (
   size: number,
   defaultSize = layout.fontSize.pc,
   hasExtension = true,
) => {
   const result = getPercent(size, defaultSize, 'part');

   if (!hasExtension) return result;
   return `${result}em`;
};

export default em;
