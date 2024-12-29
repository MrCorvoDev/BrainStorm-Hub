import {useContext} from 'react';

import {AccordionGroupContext} from '../contexts/AccordionGroupProvider';

const useAccordionGroup = () => useContext(AccordionGroupContext);

export default useAccordionGroup;
