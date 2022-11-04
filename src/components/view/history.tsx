//Module
import { forwardRef, HTMLAttributes, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";

//Components
import { IoClose } from "react-icons/io5";
import { evaluate } from "decimal-eval";

interface IHistoryProps extends HTMLAttributes<HTMLDivElement>{};
export interface IHistoryRef{
    handleActive:() => void,
};

//Container
const Container = styled.div`
    width:75%;
    height:100%;
    padding:1em;
    border-radius:6px;

    .header{
        display:flex;
        align-items:center;
        gap:.5em;

        .icon{
            font-size:1.6em;
        }
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

export const History = forwardRef<IHistoryRef, IHistoryProps>((props, ref) => {
    const [histories, setHistories] = useState<Array<string[]> | null>(null);

    const containerRef = useRef<HTMLDivElement>(null),
    handleActive = () => {
        containerRef.current?.classList.add('active');
        
    },
    handleClose = () => containerRef.current?.classList.remove('active');

    useImperativeHandle(ref, () => ({
        handleActive,
    }));

    return(
        <Container {...props} ref={containerRef}>
            <div className="header">
                <IoClose className="icon" onClick={handleClose}/>
                <h2 className="title">Histórico</h2>
            </div>
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
        </Container>
    )
});

History.displayName = 'History';