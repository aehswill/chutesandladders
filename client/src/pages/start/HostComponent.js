import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'
import { useDispatch} from 'react-redux'
import { setIsHost, setLobbyNickname} from './gamesetupSlice'

const input = /^([A-Za-z0-9', _-]{1,15})$/;

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
            <TextBox placeholder="Lobby Nickname" value={inputValue} onChange={handleUserInput} isValid={isInputValid}/>
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