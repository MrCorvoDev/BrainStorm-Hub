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
         style={{
            transition: 'visibility 0.3s',
            visibility: isOpened ? 'visible' : 'hidden',
         }}
         initial={animation}
         animate={animation}
         transition={{
            duration: 0.3,
         }}
      >
         {children}
      </motion.div>
   );
};
export default AccordionContent;
