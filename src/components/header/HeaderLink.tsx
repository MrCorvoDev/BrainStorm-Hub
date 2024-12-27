import {AnchorHTMLAttributes} from 'react';
import {Link} from 'react-router-dom';

import useHeader from '../../hooks/useHeader';
import {ReactChildrenType} from '../../types/global';

interface HeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
   to: string;
   children: ReactChildrenType;
}
const HeaderLink = ({to, children, ...props}: HeaderLinkProps) => {
   const {isMenuOpened, toggleMenu} = useHeader();

   const handleMenuClose = () => isMenuOpened && toggleMenu();

   return (
      <Link to={to} onClick={handleMenuClose} {...props}>
         {children}
      </Link>
   );
};
export default HeaderLink;
