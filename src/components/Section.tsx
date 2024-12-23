import styled from 'styled-components';

import em from '../styles/utils/em';
import {ReactPropsChildrenType} from '../types/global';

const SectionEl = styled.section`
   padding: ${em(64)} 0;
`;

const Section = ({children}: ReactPropsChildrenType) => (
   <SectionEl>{children}</SectionEl>
);
export default Section;
