//Modules
import styled from "styled-components";
import { evaluate } from "decimal-eval";
import { forwardRef, HTMLAttributes, useImperativeHandle, useState, useRef } from "react";

//Components
import { IoClose } from "react-icons/io5";

export type TKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '+' | '-' | 'x' | '÷' | '=' | 'NEG' | 'PER' | 'DOT' | 'C';

interface IViewProps extends HTMLAttributes<HTMLDivElement>{};
export interface IViewRef{
    handleSetValue: (key:TKey) => void,
    handleActive:() => void,
};

const Container = styled.div`
    height:10em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-end;
    gap:.25em;
    padding:.25em;
    overflow-x:auto;

    .old-value{
        opacity:50%;
    }
    
    .current-value{
        font-size:2em;
    }
`;

//View
export const View = forwardRef<IViewRef, IViewProps>((props, ref) => {
    const [oldValue, setOldValue] = useState<string | null>();
    const [calculation, setCalculation] = useState<string[]>(['0']);

    const historyRef = useRef<IHistoryRef>(null);

    const lastKeyIsNumber = () => !isNaN(Number(calculation.at(-1)));
    const value = () => calculation.map((n) => {
        if(n == 'x') return '*';
        if(n == '÷') return '/';
        return n;
    }).join('');
    const result = () => Number(evaluate(value()));
    const handleSetValue = (key:TKey) => {
        switch(key){
            //Erase
            case 'C':
                calculation[0] = '0';
                calculation.length = 1;
            break;
            //Numbers
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if(calculation.length > 0 && calculation.at(-1) != '0'){
                    if(lastKeyIsNumber()){
                        calculation[calculation.length - 1] += key;
                    }else{
                        calculation.push(key);
                    };
                }else if(calculation.at(-1) == '0'){
                    calculation[calculation.length - 1] = key
                }else{
                    calculation.push(key)
                };
            break;
            //Dot
            case 'DOT':
                if(lastKeyIsNumber()){
                    if(!(/\./.test(calculation.at(-1)!))) calculation[calculation.length - 1] += '.';
                };
            break;
            //Signs
            case '+':
            case '-':
            case 'x':
            case '÷':
                if(calculation.length > 0){
                    if( !lastKeyIsNumber() ){
                        calculation.pop()
                    };
                    calculation.push(key)
                };
            break;
            case '=':                
                if(!lastKeyIsNumber()){
                    calculation.pop();
                };
                if(calculation.length > 1) historyRef.current?.handleSetHistories(calculation);
                setCalculation([String(result())]);
            break;
            case 'PER':
                if(!lastKeyIsNumber()){
                    calculation.pop();
                };
                calculation[0] = String(result() / 100);
                calculation.length = 1;
            break;
            case 'NEG':
                if(!lastKeyIsNumber()){
                    calculation.pop();
                };

                calculation[calculation.length - 1] = evaluate(calculation.at(-1) + '*(-1)');
            break;
        };

        // console.log(calculation);
        if( lastKeyIsNumber() ){
            setOldValue(String(result()));
        };
    };

    const handleActive = () => historyRef.current?.handleActive();

    useImperativeHandle(ref, () => ({
        handleSetValue,
        handleActive
    }));

    return(
        <>
            <Container>
                <div id="old-value" className="old-value">{ oldValue }</div>
                <div id="current-value" className="current-value">{ calculation }</div>
            </Container>
            <History className="history" ref={historyRef}/>
        </>
    )
});
View.displayName = 'View';

//Container
const HistoryContainer = styled.div`
    width:100%;
    height:100%;
    padding:1em;
    border-radius:6px;
    overflow-y:auto;
    overflow-x:hidden;
    ::-webkit-scrollbar {
        width: 5px;
    }
    
    ::-webkit-scrollbar-track {
        background: transparent; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: #000; 
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    .header{
        display:flex;
        align-items:center;
        gap:.5em;
        position:sticky;

        .icon{
            font-size:1.6em;
            border-radius:50%;
            padding:.25em;
        }
    }

    .title{
        margin:.5em 0;
        text-align:center;
    }

    .calculate{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:flex-end;
        gap:.5em;
        border-bottom:1px solid;
        padding:.75em;
        .math{
            margin:.2em 0;
        }

        .result{
            opacity:75%;
        }
    }
`;


//History
interface IHistoryProps extends HTMLAttributes<HTMLDivElement>{};
export interface IHistoryRef{
    handleActive:() => void,
    handleSetHistories:(data:string[]) => void;
};

export const History = forwardRef<IHistoryRef, IHistoryProps>((props, ref) => {
    const [histories, setHistories] = useState<Array<string[]> | null>(null),
    handleSetHistories = (data:string[]) => {
        if(histories){
            setHistories((prev) => [...prev!, data])
        }else{
            setHistories([data]);
        }
    };

    const containerRef = useRef<HTMLDivElement>(null),
    handleActive = () => {
        containerRef.current?.classList.add('active');
    },
    handleClose = () => containerRef.current?.classList.remove('active');

    useImperativeHandle(ref, () => ({
        handleActive,
        handleSetHistories
    }));

    return(
        <HistoryContainer {...props} ref={containerRef}>
            <div className="header">
                <IoClose className="icon" onClick={handleClose}/>
            </div>
            <h2 className="title">Histórico</h2>
            {histories?.map((history, key) => {
                const result = Number(evaluate(history.map((n) => {
                    if(n == 'x') return '*';
                    if(n == '÷') return '/';
                    return n;
                }).join('')));

                return(
                    <div className="calculate" key={key}>
                        <h3 className="math">{ history }</h3>
                        <div className="result"> &#61; { result }</div>
                    </div>
                )
            })}
        </HistoryContainer>
    )
});
History.displayName = 'History';