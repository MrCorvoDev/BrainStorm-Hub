import {useContext} from 'react';

import {AccordionContext} from '../contexts/AccordionProvider';

const useAccordion = () => useContext(AccordionContext);

export default useAccordion;
