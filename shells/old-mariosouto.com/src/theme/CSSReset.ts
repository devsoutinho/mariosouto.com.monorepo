import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  body, #__next {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;
