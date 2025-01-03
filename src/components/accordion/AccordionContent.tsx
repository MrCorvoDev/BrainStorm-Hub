import {motion} from 'motion/react';

import useAccordion from '../../hooks/useAccordion';
import {ReactPropsChildrenType} from '../../types/global';

const AccordionContent = ({children}: ReactPropsChildrenType) => {
   const {isOpened} = useAccordion();
   const animation = isOpened
      ? {overflow: 'visible', opacity: 1, height: 'auto'}
      : {overflow: 'hidden', opacity: 0, height: 0};

   return (
      <motion.div
         style={isOpened ? {visibility: 'visible'} : {visibility: 'hidden'}}
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
