import {ReactPropsChildrenType} from '../../types/global';
import {useAccordion} from './Accordion';

const AccordionButton = ({children}: ReactPropsChildrenType) => {
   const {toggle} = useAccordion();

   return (
      <button type='button' onClick={toggle}>
         {children}
      </button>
   );
};
export default AccordionButton;
