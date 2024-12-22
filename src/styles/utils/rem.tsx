import getPercent from '../../utils/getPercent';
import {layout} from '../theme';

const rem = (size: number, hasExtension = true) => {
   const result = getPercent(size, layout.fontSize.default, 'part');

   if (!hasExtension) return result;
   return `${result}rem`;
};

export default rem;
