import {ReactChildrenType} from '../../types/global';
import {useAccordion} from './Accordion';

interface AccordionButtonProps {
   className?: string;
   children: ReactChildrenType;
}
const AccordionButton = ({className, children}: AccordionButtonProps) => {
   const {toggle} = useAccordion();

   return (
      <button type='button' onClick={toggle} className={className}>
         {children}
      </button>
   );
};
export default AccordionButton;
