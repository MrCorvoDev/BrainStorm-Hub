import {
   Children,
   cloneElement,
   createContext,
   ReactElement,
   useContext,
   useState,
} from 'react';

interface initContextType {
   activeIndex: number | undefined;
   setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const initContext: initContextType = {
   activeIndex: undefined,
   setActiveIndex: () => void 0,
};

const AccordionGroupContext = createContext<initContextType>(initContext);
export const useAccordionGroup = () => useContext(AccordionGroupContext);

interface ChildProps {
   index: number;
}
interface AccordionGroupProps {
   children: ReactElement[];
}
const AccordionGroup = ({children}: AccordionGroupProps) => {
   const [activeIndex, setActiveIndex] =
      useState<initContextType['activeIndex']>();

   return (
      <AccordionGroupContext.Provider value={{activeIndex, setActiveIndex}}>
         {Children.map(children, (child, index) =>
            cloneElement(child as ReactElement<ChildProps>, {
               key: index,
               index,
            }),
         )}
      </AccordionGroupContext.Provider>
   );
};

export default AccordionGroup;
