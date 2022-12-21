import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --color1 : #e0eafc;
    --color2 : #e8cbc0;
    --color3 : #636fa4;
  }

  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
}

*{
  font-family: 'NanumSquareNeo-Variable';
  
}
body {
    background: linear-gradient(to right, var(--color1), var(--color2));
    width: 100vw;
    height: 100vh;
  }

  html {
    font-size: 15px;
  }
`;

export default GlobalStyle;
