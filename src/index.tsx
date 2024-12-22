import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from 'styled-components';

import App from './App';
import ResizeService from './services/ResizeService';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <ResizeService />
         <App />
      </ThemeProvider>
   </StrictMode>,
);
