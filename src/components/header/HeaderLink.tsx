import {Link} from 'react-router-dom';

import useHeader from '../../hooks/useHeader';
import {ReactChildrenType} from '../../types/global';

interface HeaderLinkProps {
   to: string;
   className?: string | undefined;
   children: ReactChildrenType;
}
const HeaderLink = ({to, className, children}: HeaderLinkProps) => {
   const {isMenuOpened, toggleMenu} = useHeader();

   const handleMenuClose = () => isMenuOpened && toggleMenu();

   return (
      <Link to={to} className={className} onClick={handleMenuClose}>
         {children}
      </Link>
   );
};
export default HeaderLink;
