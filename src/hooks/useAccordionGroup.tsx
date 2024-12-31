import {useContext} from 'react';

import {AccordionGroupContext} from '../contexts/AccordionGroupContext';

const useAccordionGroup = () => useContext(AccordionGroupContext);

export default useAccordionGroup;
