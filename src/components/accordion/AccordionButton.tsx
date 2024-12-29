import {ButtonHTMLAttributes} from 'react';

import {ReactPropsChildrenType} from '../../types/global';
import {useAccordion} from './Accordion';

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
