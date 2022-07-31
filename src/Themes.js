import { createGlobalStyle } from "styled-components";
export const lightTheme= {
    body:'rgb(148,163,184,0.15)',
    font: 'black',
    cardbg: '#fff',
}
export const darkTheme= {
    body:'#000',
    font: '#01001',
    cardbg: 'rgb(180,203,255,0.7)',
}

export const GlobalStyles = createGlobalStyle`

    body{
        background-color: ${(props)=>props.theme.body};
        color:${(props)=>props.theme.font};
    }

    .bathao{
        background-color: ${(props)=>props.theme.cardbg};
    }

`