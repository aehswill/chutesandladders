import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'
import { useDispatch} from 'react-redux'
import { setIdToJoin} from './gamesetupSlice'

export default function JoinComponent(props){
    const dispatch = useDispatch();


    /**
     * do a deach for the lobby? 
     */
    var userInput;
    const handleUserInput = (evt)=>{
        //HANDLE INPUT VALIDATION HERE!
        userInput = evt.target.value;
        console.log(userInput)
    }
    function onClick(){
        //search for valid lobby
        dispatch(setIdToJoin(userInput));
    }
    return(
        <JoinContainer>
            <h1>Join a Game</h1>
            <TextBox placeholder="Lobby ID" value={userInput} onChange={handleUserInput}/>
            <StartButton text="JOIN" click={()=>{
                onClick(); 
                props.onClick();
                }}/>
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