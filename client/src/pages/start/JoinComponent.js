import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'

export default function JoinComponent(props){
    return(
        <JoinContainer>
            <h1>Join a Game</h1>
            <TextBox placeholder="Lobby ID"/>
            <StartButton text="JOIN"/>
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