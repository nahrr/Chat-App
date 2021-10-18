import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    html, body {
        font-family: 'Montserrat'; 
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #282c34;
        min-height: 100vh;
        margin: 0 auto;
    }

    * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
 `;

export default GlobalStyle;
