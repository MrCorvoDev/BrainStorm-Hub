import {useContext} from 'react';

import {AccordionContext} from '../contexts/AccordionContext';

const useAccordion = () => useContext(AccordionContext);

export default useAccordion;
