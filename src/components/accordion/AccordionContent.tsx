import {motion} from 'motion/react';

import {ReactPropsChildrenType} from '../../types/global';
import {useAccordion} from './Accordion';

const AccordionContent = ({children}: ReactPropsChildrenType) => {
   const {isOpened} = useAccordion();
   const animation = isOpened
      ? {overflow: 'visible', opacity: 1, height: 'auto'}
      : {overflow: 'hidden', opacity: 0, height: 0};

   return (
      <motion.div
         initial={animation}
         animate={animation}
         transition={{
            type: 'spring',
            duration: 0.5,
            bounce: 0.3,
         }}
      >
         {children}
      </motion.div>
   );
};
export default AccordionContent;
