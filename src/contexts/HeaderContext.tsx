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

   const [prevY, setPrevY] = useState(lastY);

   const isExpectedRender = useRef(1);
   useEffect(() => {
      if (isExpectedRender.current < 4 && ++isExpectedRender.current) return;

      setIsSticky(prevY < lastY && lastY > headerHeight); // If scrolls down and below header height
      setPrevY(lastY);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lastY]);

   return isSticky;
};

interface initContextType {
   isSticky: boolean;
   isMenuOpened: boolean;
   toggleMenu: () => void;
}
const initContext: initContextType = {
   isSticky: false,
   isMenuOpened: false,
   toggleMenu: () => void 0,
};

const useMenu = (isMenuOpenedInit: boolean) => {
   const [isMenuOpened, setIsMenuOpened] = useState(isMenuOpenedInit);

   useLockScroll(isMenuOpened);
   const isNotMobile = useMediaQuery(`(${md(layout.md3, 'min')})`);
   if (isNotMobile && isMenuOpened) setIsMenuOpened(false);

   const toggleMenu = () => setIsMenuOpened(prev => !prev);

   return [isMenuOpened, toggleMenu] as const;
};

const useHeaderContext = ({
   isSticky: isStickyInit,
   isMenuOpened: isMenuOpenedInit,
}: initContextType) => {
   const isSticky = useSticky(isStickyInit);
   const [isMenuOpened, toggleMenu] = useMenu(isMenuOpenedInit);

   return {isSticky, isMenuOpened, toggleMenu};
};

export const HeaderContext = createContext<initContextType>(initContext);

export const HeaderProvider = ({children}: ReactPropsChildrenType) => (
   <HeaderContext.Provider value={useHeaderContext(initContext)}>
      {children}
   </HeaderContext.Provider>
);

export default HeaderContext;
