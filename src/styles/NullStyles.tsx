import {css} from 'styled-components';

const NullStyles = css`
   * {
      padding: 0;
      margin: 0;
      border: 0;
      box-sizing: border-box;
      &:focus {
         outline-color: transparent;
      }
   }
   *:before,
   *:after {
      box-sizing: border-box;
   }
   a,
   span,
   label,
   em,
   i,
   strong,
   *:before,
   *:after {
      display: inline-block;
   }
   aside,
   nav,
   main,
   footer,
   header,
   section,
   input,
   textarea,
   picture,
   video,
   canvas,
   svg,
   details {
      display: block;
   }
   html {
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      scroll-behavior: smooth;
   }
   body {
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-size-adjust: 100%;
      min-height: 100vh;
   }
   input,
   button,
   textarea,
   select {
      font: inherit;
   }
   button,
   a {
      color: inherit;
      cursor: pointer;
      background-color: transparent;
   }
   button::-moz-focus-inner {
      padding: 0;
      border: 0;
   }
   a,
   a:visited {
      text-decoration: none;
   }
   a:hover {
      text-decoration: none;
   }
   li {
      list-style: none;
   }
   img {
      vertical-align: top;
      display: inline-block;
   }
   h1,
   h2,
   h3,
   h4,
   h5,
   h6,
   p {
      font-weight: inherit;
      font-size: inherit;
      overflow-wrap: break-word;
   }
   button,
   [type='button'],
   [type='reset'],
   [type='submit'] {
      -webkit-appearance: button;
   }
`;

export default NullStyles;
