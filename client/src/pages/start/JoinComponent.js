import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'
import { useDispatch} from 'react-redux'
import { setIdToJoin} from './gamesetupSlice'

const input = /^([A-Za-z0-9]{1,6})$/;

export default function JoinComponent(props){
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
            dispatch(setIdToJoin(inputValue));
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
        <JoinContainer>
            <h1>Join a Game</h1>
            <TextBox placeholder="Lobby ID" value={inputValue} onChange={handleUserInput} isValid={isInputValid}/>
            <StartButton text="JOIN" isDisabled={!isInputValid} click={onClick}/>
        </JoinContainer>
    )
}

// STYLE
const JoinContainer = styled.div`
  grid-area: specific;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
`;