import styled from "styled-components";

export const Footer = () => {
    const Footer = styled.footer`
        width:100%;
        color:#fff;
        text-align:center;
        padding:.5em;
        background:#00864e80;
        border-radius:4px;
        *{
            color:#fff;
        }
    `;
    return(
        <Footer>Feito com &#10084; por <a href="https://github.com/WesleyMaik" target="_blank">Wesley Maik</a></Footer>
    )
};