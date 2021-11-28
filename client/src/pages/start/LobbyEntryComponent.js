import React from 'react'
import styled from 'styled-components'
import Bot from '../../assets/Bot.png'
import Human from '../../assets/Human.png'
import { useDispatch} from 'react-redux'
import { setLobbyID, setLobbyNickname} from './gamesetupSlice'

export default function LobbyEntryComponent(props){
  const dispatch = useDispatch();

  function onClick(){

    dispatch(setLobbyID(props.lobbyID));
    dispatch(setLobbyNickname(props.lobbyName));
    // isHost = false by default

  }
    return(
        <ListItem onClick={()=>{
          onClick();
          props.click();
          }}>
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
    var icon = <img src={Human} alt="Human Icon"/>
    if(props.isRobot){
        icon = <img src={Bot} alt="Robot"/>
    }
    return icon
}

// STYLE
const ListItem = styled.li`
  height: 76px;
  width: 525px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 30px;
  padding: 0px 20px;
  align-items: center;
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.25) 100%), #00B800;
  background-blend-mode: soft-light, normal;
  border: 3px solid rgba(0,0,0,0.35);
  border-radius: 8px;
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
  gap: 5px;
  align-items: center;
  height: 30px;
  border: 2px solid black;
  border-radius: 8px;
`;