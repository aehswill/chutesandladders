import React from 'react'
import styled from 'styled-components'
import Bot from '../../assets/Bot.png'
import Human from '../../assets/Human.png'

export default function LobbyEntryComponent(props){
    return(
        <ListItem>
            <ListItemText>{props.lobbyName}</ListItemText>
            <ListItemText>{props.lobbyID}</ListItemText>
            <PortraitContainer>
                {(props.players).map(player=>(
                    <div className="tooltip">
                        <Portrait isRobot={player.isRobot}/>
                        <span className="tooltiptext">{player.nickname}</span>
                    </div>
                ))}
            </PortraitContainer>

        </ListItem>
    );
}

function Portrait(props){
    var icon = <img src={Human}/>
    if(props.isRobot){
        icon = <img src={Bot}/>
    }
    return icon
}

// STYLE
const ListItem = styled.li`
  height: 80px;
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 30px;
  padding: 0px 20px;
  align-items: center;
  background-color: #00B800;
  border: 0px;
  border-radius: 4px;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  &:hover{
    border: 3px solid #FFE424;
    box-shadow: 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.2);
  }
`;
const ListItemText = styled.text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 800;
  font-size: 29px;
  line-height: 80px;
  color: white;
  -webkit-text-stroke: 1px black;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
`;
const PortraitContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
`;