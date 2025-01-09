import {useThrottle, useWindowSize} from '@uidotdev/usehooks';
import {useEffect, useRef} from 'react';

export const useResizeService = () => {
   const {width} = useWindowSize();
   const throttledValue = useThrottle(width, 250);
   const isInitialRender = useRef(1);

   useEffect(() => {
      if (isInitialRender.current !== 4) {
         isInitialRender.current++;
         return;
      }

      document.body.classList.add('resize');

      const timeoutId = setTimeout(
         () => document.body.classList.remove('resize'),
         300,
      );

      return () => clearTimeout(timeoutId);
   }, [throttledValue]);
};

export default useResizeService;
