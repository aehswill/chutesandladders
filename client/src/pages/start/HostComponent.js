import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'
import { useDispatch} from 'react-redux'
import { setIsHost, setLobbyNickname} from './gamesetupSlice'


export default function HostComponent(props){
    const dispatch = useDispatch();

    var userInput;
    const handleUserInput = (evt)=>{
        //HANDLE INPUT VALIDATION HERE!
        userInput = evt.target.value;
        console.log(userInput)
    }
    function onClick(){
        dispatch(setIsHost(true));
        dispatch(setLobbyNickname(userInput));
    }

    return(
        <HostContainer>
            <h1>Host a New Game</h1>
            <TextBox placeholder="Lobby Nickname" value={userInput} onChange={handleUserInput}/>
            <StartButton text="START" click={()=>{
                onClick(); 
                props.onClick();
                }}/>
        </HostContainer>
    )
}

// STYLE
const HostContainer = styled.div`
  grid-area: host;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
`;