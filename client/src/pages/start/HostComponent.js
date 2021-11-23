import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'
import { useDispatch, useSelector } from 'react-redux'
import { setIsHost, setLobbyNickname, setLobbyID} from './gamesetupSlice'
import { customAlphabet } from 'nanoid'

const input = /^([A-Za-z0-9', _-]{1,15})$/;
const helpText = "Nickname must only contain the following characters: A-Z a-z 0-9 - _ , '"
const nanoid = customAlphabet("ABCDEF0123456789", 6); // lobby ID will be uppercase hex, searches need to ignore case

export default function HostComponent(props){
    const dispatch = useDispatch();
    const [isInputValid, setIsInputValid] = React.useState(true);

    var inputValue;
    const handleUserInput = (evt)=>{
        if((evt.target.value).length > 0 && input.test(evt.target.value)){
            setIsInputValid(true);
            inputValue = evt.target.value;
        }
        else{
            setIsInputValid(false);
        }
    }

    function onClick(){
        if(inputValue != null){
            dispatch(setIsHost(true));
            dispatch(setLobbyNickname(inputValue));
            const lobbyID = nanoid();
            console.log("Lobby ID generated... "+lobbyID);
            dispatch(setLobbyID(lobbyID));
            inputValue = "";
            setIsInputValid(true);
            props.onClick();
        }
        else{
            setIsInputValid(false);
            setIsInputValid(true);
        } 
    }

    return(
        <HostContainer>
            <h1>Host a New Game</h1>
            <TextBox placeholder="Lobby Nickname" value={inputValue} 
            onChange={handleUserInput} isValid={isInputValid} helpText={helpText}/>
            <StartButton text="START" isDisabled={!isInputValid} click={onClick}/>
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