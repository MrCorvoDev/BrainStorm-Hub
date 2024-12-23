import styled from 'styled-components';

import em from '../../styles/utils/em';
import {ReactChildrenType} from '../../types/global';

const LabelEl = styled.label`
   display: flex;
   flex-direction: column;
   gap: ${em(12)};
   span {
      font-size: ${em(24)};
   }
`;

interface LabelProps {
   title: string;
   children: ReactChildrenType;
}
const Label = ({title, children}: LabelProps) => (
   <LabelEl>
      <span>{title}</span>
      {children}
   </LabelEl>
);
export default Label;
