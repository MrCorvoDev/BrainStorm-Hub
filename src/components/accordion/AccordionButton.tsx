import {ButtonHTMLAttributes} from 'react';

import useAccordion from '../../hooks/useAccordion';
import {ReactPropsChildrenType} from '../../types/global';

const AccordionButton = ({
   children,
   ...props
}: ReactPropsChildrenType & ButtonHTMLAttributes<HTMLButtonElement>) => {
   const {toggle} = useAccordion();

   return (
      <button type='button' onClick={toggle} {...props}>
         {children}
      </button>
   );
};
export default AccordionButton;
