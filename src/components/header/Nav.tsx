import styled, {css} from 'styled-components';

import useHeader from '../../hooks/useHeader';
import {layout} from '../../styles/theme';
import em from '../../styles/utils/em';
import md from '../../styles/utils/md';
import rem from '../../styles/utils/rem';
import HeaderLink from './HeaderLink';

interface NavProps {
   $isSticky: boolean;
   $isMenuOpened: boolean;
}
const NavEl = styled.nav<NavProps>`
   @media (${md(layout.md3)}) {
      --menuPaddingTB: ${rem(30)};
      --menuPaddingRL: ${rem(20)};
      visibility: hidden;
      transition: 0.3s;
      overflow: auto;
      position: fixed;
      top: 0;
      transform: translate(0, -100%);
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: calc(var(--headerH) + var(--menuPaddingTB));
      padding-bottom: var(--menuPaddingTB);
      padding-left: var(--menuPaddingRL);
      padding-right: var(--menuPaddingRL);
      z-index: 1;

      ${({$isSticky}) =>
         $isSticky &&
         css`
            padding-top: calc(var(--headerSH) + var(--menuPaddingTB));
         `}

      ${({$isMenuOpened}) =>
         $isMenuOpened &&
         css`
            visibility: visible;
            transform: translate(0, 0);
         `}
   }
`;

const List = styled.ul`
   position: relative;
   z-index: 3;
   display: flex;
   gap: ${em(20)};
   @media (${md(layout.md3)}) {
      flex-direction: column;
   }
`;

const NavLink = styled(HeaderLink)`
   font-size: ${em(25)};
`;

const Nav = () => {
   const {isSticky, isMenuOpened} = useHeader();

   return (
      <NavEl $isSticky={isSticky} $isMenuOpened={isMenuOpened}>
         <List>
            <NavLink to=''>Collection</NavLink>
            <NavLink to='create-quiz'>Create Quiz</NavLink>
         </List>
      </NavEl>
   );
};
export default Nav;
