import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {layout} from '../styles/theme';
import em from '../styles/utils/em';
import md from '../styles/utils/md';

const FooterEL = styled.footer`
   background-color: #171717;
   padding: ${em(24)} 0;
`;

const FooterBody = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: ${em(16)};
   @media (${md(layout.md3)}) {
      flex-direction: column;
   }
`;

const Logo = styled(Link)`
   font-size: ${em(27.5)};
   position: relative;
   z-index: 2;
   font-weight: 700;
`;
const Copyright = styled.p`
   font-size: ${em(18)};
`;

const Footer = () => (
   <FooterEL>
      <FooterBody className='container'>
         <Logo to=''>BrainStorm Hub</Logo>
         <Copyright>&copy; {new Date().getFullYear()}</Copyright>
      </FooterBody>
   </FooterEL>
);
export default Footer;
