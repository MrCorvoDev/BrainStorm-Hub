import {useMediaQuery, useThrottle, useWindowScroll} from '@uidotdev/usehooks';
import {createContext, useEffect, useRef, useState} from 'react';

import useLockScroll from '../hooks/useLockScroll';
import {layout} from '../styles/theme';
import dc from '../styles/utils/dc';
import md from '../styles/utils/md';
import {ReactPropsChildrenType} from '../types/global';
import resolveCssCalc from '../utils/resolveCssCalc';

const useSticky = (isStickyInit: boolean) => {
   const [isSticky, setIsSticky] = useState(isStickyInit);

   const [{y}] = useWindowScroll();
   const lastY = useThrottle(y, 500) ?? 0;
   const headerHeight = resolveCssCalc(
      dc(layout.headerHeights.pc, layout.headerHeights.mobile),
   );

   const prevY = useRef(lastY);

   const isExpectedRender = useRef(1);
   useEffect(() => {
      if (isExpectedRender.current < 4 && ++isExpectedRender.current) return;

      setIsSticky(prevY.current < lastY && lastY > headerHeight); // If scrolls down and below header height
      prevY.current = lastY;
   }, [headerHeight, lastY]);

   return isSticky;
};

const useMenu = (isMenuOpenedInit: boolean) => {
   const [isMenuOpened, setIsMenuOpened] = useState(isMenuOpenedInit);

   useLockScroll(isMenuOpened);
   const isNotMobile = useMediaQuery(`(${md(layout.md3, 'min')})`);
   if (isNotMobile && isMenuOpened) setIsMenuOpened(false);

   const toggleMenu = () => setIsMenuOpened(prev => !prev);

   return [isMenuOpened, toggleMenu] as const;
};

interface initContextType {
   isSticky: boolean;
   isMenuOpened: boolean;
   toggleMenu: () => void;
}
export const HeaderContext = createContext({} as initContextType);

export const HeaderProvider = ({children}: ReactPropsChildrenType) => {
   const isSticky = useSticky(false);
   const [isMenuOpened, toggleMenu] = useMenu(false);

   return (
      <HeaderContext.Provider
         value={{
            isSticky,
            isMenuOpened,
            toggleMenu,
         }}
      >
         {children}
      </HeaderContext.Provider>
   );
};

export default HeaderContext;
