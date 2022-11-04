//Modules
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { TKey } from "../view";

//Components
import { Button } from "./index";

interface IButtonsProps extends HTMLAttributes<HTMLDivElement>{
    onButtonsClick:(key:TKey) => void;
};

export const Buttons = (props:IButtonsProps) => {
    const Buttons = styled.div`
        --gap:.5em;
        height:100%;
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap:var(--gap);
        .zero{
            grid-column: 1 / 3;
        }
    `;

    const 
    handleC  = () => props.onButtonsClick('C'),
    handleNeg  = () => props.onButtonsClick('NEG'),
    handlePer  = () => props.onButtonsClick('PER'),
    handleDiv  = () => props.onButtonsClick('÷'),
    handleTimes  = () => props.onButtonsClick('x'),
    handleMinus  = () => props.onButtonsClick('-'),
    handlePlus  = () => props.onButtonsClick('+'),
    handleEqual = () => props.onButtonsClick('='),
    handle7  = () => props.onButtonsClick('7'),
    handle8  = () => props.onButtonsClick('8'),
    handle9  = () => props.onButtonsClick('9'),
    handle4  = () => props.onButtonsClick('4'),
    handle5  = () => props.onButtonsClick('5'),
    handle6  = () => props.onButtonsClick('6'),
    handle1  = () => props.onButtonsClick('1'),
    handle2  = () => props.onButtonsClick('2'),
    handle3 = () => props.onButtonsClick('3'),
    handle0 = () => props.onButtonsClick('0'),
    handleDot = () => props.onButtonsClick('DOT');
    
    return(
        <Buttons {...props}>
            <Button
                onClick={handleC}
            >C</Button>
            <Button
                onClick={handleNeg}
            >&#177;</Button>
            <Button
                onClick={handlePer}
            >&#65285;</Button>
            <Button
                onClick={handleDiv}
            >&#247;</Button>
            <Button
                onClick={handle7}
            >7</Button>
            <Button
                onClick={handle8}
            >8</Button>
            <Button
                onClick={handle9}
            >9</Button>
            <Button
                onClick={handleTimes}
            >&#215;</Button>
            <Button
                onClick={handle4}
            >4</Button>
            <Button
                onClick={handle5}
            >5</Button>
            <Button
                onClick={handle6}
            >6</Button>
            <Button
                onClick={handleMinus}
            >&#8722;</Button>
            <Button
                onClick={handle1}
            >1</Button>
            <Button
                onClick={handle2}
            >2</Button>
            <Button
                onClick={handle3}
            >3</Button>
            <Button
                onClick={handlePlus}
            >&#43;</Button>
            <Button 
                className="zero"
                onClick={handle0}
            >0</Button>
            <Button
                onClick={handleDot}
            >&#46;</Button>
            <Button
                onClick={handleEqual}
            >&#61;</Button> 
      </Buttons>
    )
};