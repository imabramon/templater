import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
html, body {
    margin: 0;
    height: 100%;
}
    /* body{
        width: 100vw;
        height: 100vh;
    }*/

    #root{
        width: 100vw;
        height: 100vh;
        border: 1px solid black;
    } 
`
