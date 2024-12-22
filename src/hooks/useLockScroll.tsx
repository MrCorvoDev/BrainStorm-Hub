import {useEffect} from 'react';

const lock = ({style}: HTMLElement) => {
   document.body.style.setProperty(
      '--lp',
      innerWidth - document.body.offsetWidth + 'px',
   );
   style.overflow = 'hidden';
   style.touchAction = 'none';
};

const unlock = ({style}: HTMLElement) => {
   style.overflow = '';
   style.touchAction = '';
   document.body.style.setProperty('--lp', '0');
};

const useLockScroll = (isLock: boolean) => {
   useEffect(() => {
      if (isLock) lock(document.body);
      else unlock(document.body);

      return () => unlock(document.body);
   }, [isLock]);
};

export default useLockScroll;
