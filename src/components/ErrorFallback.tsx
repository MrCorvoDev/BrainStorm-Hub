import {useErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import ButtonStyles from '../styles/ButtonStyles';
import em from '../styles/utils/em';

interface ErrorFallbackProps {
   error: Error;
}

const Error = styled.div`
   padding: ${em(22)} ${em(28)};
   border-radius: 5px;
   display: flex;
   flex-direction: column;
   background: ${props => props.theme.color2 as string};
   gap: ${em(12)};
`;

const Title = styled.h2`
   font-size: ${em(28)};
   font-weight: 700;
`;
const Description = styled.p`
   font-size: ${em(20)};
`;
const ButtonEl = styled.button`
   ${ButtonStyles}
   background: ${props => props.theme.color4 as string};
   color: ${props => props.theme.color2 as string};
   @media (hover: hover) {
      &:hover {
         color: ${props => props.theme.color4 as string};
         background: ${props => props.theme.color3 as string};
      }
   }
`;

const ErrorFallback = ({error}: ErrorFallbackProps) => {
   const {resetBoundary} = useErrorBoundary();

   return (
      <Error role='alert'>
         <Title>Something went wrong:</Title>
         <Description>{error.message}</Description>
         <ButtonEl onClick={resetBoundary}>Try again</ButtonEl>
      </Error>
   );
};
export default ErrorFallback;
