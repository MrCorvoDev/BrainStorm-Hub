import Color from 'color';
import styled from 'styled-components';

import {HeaderProvider} from '../../contexts/HeaderContext';
import useHeader from '../../hooks/useHeader';
import em from '../../styles/utils/em';
import lockPadding from '../../styles/utils/lockPadding';
import HeaderLink from './HeaderLink';
import Menu from './Menu';

const PlaceHolder = styled.div`
   height: var(--headerH);
`;

const HeaderBody = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: 0.3s;
`;

interface HeaderProps {
   $isSticky?: boolean | undefined;
   Color?: Color;
}
const HeaderEl = styled.header<HeaderProps>`
   --background: ${({theme}) =>
      Color(theme.color2 as string)
         .alpha(0.6)
         .hexa()};
   --blur: 5px;
   position: fixed;
   width: 100%;
   top: 0;
   left: 0;
   z-index: 100;
   ${lockPadding()}
   &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background);
      z-index: 2;
      backdrop-filter: blur(var(--blur));
   }

   ${HeaderBody} {
      height: var(${({$isSticky}) => ($isSticky ? '--headerSH' : '--headerH')});
   }
`;

const Logo = styled(HeaderLink)`
   font-size: ${em(27.5)};
   position: relative;
   z-index: 2;
   font-weight: 700;
`;

const HeaderElement = () => {
   const {isSticky} = useHeader();

   return (
      <HeaderEl $isSticky={isSticky}>
         <HeaderBody className='container'>
            <Logo to=''>BrainStorm Hub</Logo>
            <Menu />
         </HeaderBody>
      </HeaderEl>
   );
};

const Header = () => (
   <HeaderProvider>
      <PlaceHolder />
      <HeaderElement />
   </HeaderProvider>
);

export default Header;
