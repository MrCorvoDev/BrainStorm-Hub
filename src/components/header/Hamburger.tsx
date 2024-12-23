import styled, {css} from 'styled-components';

import useHeader from '../../hooks/useHeader';
import {layout} from '../../styles/theme';
import md from '../../styles/utils/md';
import rem from '../../styles/utils/rem';

const HamburgerBody = styled.span`
   position: relative;
   transition: 0.3s;
   width: var(--burgerWidth);
   height: var(--burgerHeight);
`;

const Line = styled.span`
   content: '';
   transition: 0.3s;
   position: absolute;
   left: 0;
   width: 100%;
   height: ${rem(2)};
   background: var(--burgerColor);
`;

const LineTop = styled(Line)`
   top: 0;
`;

const LineMiddle = styled(Line)`
   top: 50%;
   transform: scale(1) rotate(0deg) translate(0, -50%);
`;

const LineBottom = styled(Line)`
   bottom: 0;
`;

interface HamburgerProps {
   $isMenuOpened: boolean;
}
const HamburgerEl = styled.button<HamburgerProps>`
   --burgerWidth: ${rem(30)};
   --burgerHeight: ${rem(20)};
   --burgerColor: ${({theme}) => theme.color4 as string};
   --burgerSpace: calc((var(--headerH) - var(--burgerWidth)) / 2);
   height: 100%;
   padding: 0 var(--burgerSpace);
   margin-right: calc(var(--burgerSpace) * -1);
   position: relative;
   z-index: 3;
   @media (${md(layout.md3, 'min')}) {
      display: none;
   }

   ${({$isMenuOpened}) =>
      $isMenuOpened &&
      css`
         ${LineTop} {
            top: 50%;
            transform: rotate(45deg) translate(0, -50%);
         }
         ${LineMiddle} {
            transform: scale(0) rotate(-45deg) translate(0, -50%);
         }
         ${LineBottom} {
            bottom: 50%;
            transform: rotate(-45deg) translate(0, 50%);
         }
      `}
`;

const Hamburger = () => {
   const {isMenuOpened, toggleMenu} = useHeader();

   return (
      <HamburgerEl
         $isMenuOpened={isMenuOpened}
         title='Toggle Menu'
         aria-label='Toggle Menu'
         type='button'
         onClick={toggleMenu}
      >
         <HamburgerBody>
            <LineTop />
            <LineMiddle />
            <LineBottom />
         </HamburgerBody>
      </HamburgerEl>
   );
};
export default Hamburger;
