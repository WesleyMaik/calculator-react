//Modules
import styled from "styled-components";
import { HTMLAttributes } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement>{};

export const Button = (props:IButtonProps) => {
    const Button = styled.button`
        cursor: pointer;
        max-width:100%;
        width:100%;
        height:4em;
        padding:.5em;
        border:none;
        outline:none;
        border-radius:4px;
        box-shadow:0 0 8px #00000020;
        transition:all ease .2s;
        &:active{
            box-shadow:none;
            transform:scale(.9);
        }
    `;

    return <Button {...props}/>
};