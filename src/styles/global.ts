import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body, html {
    height: 100%;
  }

  body {
    background: #FBFBFB;
    color: #312E38;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select, option, textarea {
    font-family: 'Inter';
    font-style: normal;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 800;
  }

  button {
    cursor: pointer;
  }

  #root {
    height: 100%
  }
`;
