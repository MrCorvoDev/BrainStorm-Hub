import styled, {keyframes} from 'styled-components';

import em from '../styles/utils/em';

const Rotation = keyframes`
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
`;
const SpinnerEl = styled.i`
   width: ${em(48)};
   height: ${em(48)};
   border: ${em(5)} solid #fff;
   border-bottom-color: transparent;
   border-radius: 50%;
   display: inline-block;
   box-sizing: border-box;
   animation: ${Rotation} 1s linear infinite;
`;

const Spinner = ({...props}) => <SpinnerEl {...props} />;
export default Spinner;
