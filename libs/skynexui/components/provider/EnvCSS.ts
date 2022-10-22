import { createGlobalStyle } from 'styled-components';

export const EnvCSS = createGlobalStyle && createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-weight: 400;
    box-sizing: border-box;
    color: initial;
  }
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
