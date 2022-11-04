//Modules
import { useRef } from "react";
import styled from "styled-components";

//Components
import { Buttons } from "../components/button/buttons";
import { IViewRef, TKey, View } from "../components/view";
import { BiAdjust, BiHistory } from 'react-icons/bi';

//Container
const Container = styled.main`
  --bg-color:var(--background-color);
  --fg-color:var(--secundary-color);
  max-width:var(--width);
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  gap:.5em;
  position:relative;
  padding:.5em;
  color:var(--primary-color);
  background-color:var(--bg-color);
  border-radius:6px;
  box-shadow:0 0 8px #00000020;
  transition:all ease .2s;
  overflow:hidden;

  &.dark-mode{
    --bg-color:#1a1c1b;
    --fg-color:#1f2221;
    .buttons{
      *{
        color:var(--secundary-color);
      }
    }
  }

  .color-mode{
    text-align:right;
  }

  .icon{
    font-size:1.6em;
    cursor: pointer;
  }

  .history{
    position:absolute;
    top:0;
    right:-100%;
    background-color:#17171780;
    backdrop-filter:blur(8px);
    transition:right ease .5s;
    &.active{
      right:0;
    }
  }

  .buttons{
    > *{
      user-select:none;
      height:100% !important;
      font-size:1em;
      background-color:var(--fg-color);

      &:active{
          color:#000;
          background-color:var(--primary-color);
      }
    }
  }
`;

const App = () => {
  //Ref
  const containerRef = useRef<HTMLDivElement>(null),
        viewRef = useRef<IViewRef>(null);

  //Color mode
  const handleToggleColorMode = () => {
    containerRef.current?.classList.toggle('dark-mode');
  };

  //Buttons
  const handleClickButtons = (key:TKey) => {
    viewRef.current?.handleSetValue(key)
  };

  //History
  const handleHistoryActive = () => {
    viewRef.current?.handleActive();
  };

  return(
    <>
    <Container ref={containerRef} className="dark-mode">
      <div className="color-mode">
        <BiAdjust className="icon" onClick={handleToggleColorMode}/>
        <BiHistory className="icon" onClick={handleHistoryActive}/>
      </div>
      <View className="view" ref={viewRef} />
      <Buttons className="buttons" onButtonsClick={handleClickButtons}/>
    </Container>
    </>
  )
};

export default App;