import {createContext, useContext, useEffect, useState} from 'react';

import {ReactChildrenType} from '../../types/global';
import {useAccordionGroup} from './AccordionGroup';

interface AccordionContextType {
   toggle: () => void;
   isOpened: boolean;
}
const AccordionContext = createContext({} as AccordionContextType);
export const useAccordion = () => useContext(AccordionContext);

interface AccordionProps {
   defaultOpened?: boolean;
   index?: number;
   children: ReactChildrenType;
}
const Accordion = ({
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

export default Accordion;
