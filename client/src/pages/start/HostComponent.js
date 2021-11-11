import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox'
import StartButton from '../../common/StartButton'

export default function HostComponent(props){
    return(
        <HostContainer>
            <h1>Host a New Game</h1>
            <TextBox placeholder="Lobby Nickname"/>
            <StartButton text="START"/>
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