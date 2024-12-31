import {createContext, useEffect, useState} from 'react';

import useAccordionGroup from '../hooks/useAccordionGroup';
import {ReactChildrenType} from '../types/global';

interface AccordionContextType {
   toggle: () => void;
   isOpened: boolean;
}
export const AccordionContext = createContext({} as AccordionContextType);

interface AccordionProps {
   defaultOpened?: boolean;
   index?: number;
   children: ReactChildrenType;
}
const AccordionProvider = ({
   defaultOpened = false,
   index,
   children,
}: AccordionProps) => {
   const isGroup = index !== undefined;

   const [isOpened, setIsOpened] = useState(defaultOpened);
   const {activeIndex, setActiveIndex} = useAccordionGroup();

   useEffect(() => {
      if (typeof activeIndex !== 'number') return;

      const shouldClose = isGroup && activeIndex !== index;
      if (shouldClose) setIsOpened(false);
   }, [activeIndex, index, isGroup]);

   const toggle = () => {
      setIsOpened(!isOpened);
      if (isGroup && !isOpened) setActiveIndex(index);
   };

   return (
      <AccordionContext.Provider value={{toggle, isOpened}}>
         {children}
      </AccordionContext.Provider>
   );
};

export default AccordionProvider;
