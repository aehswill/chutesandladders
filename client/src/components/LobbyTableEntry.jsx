import React from 'react'
import styled from 'styled-components'
import PlayerPortrait from './PlayerPortrait';


const Entry = styled.button`
  height: 80px;
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const EntryText = styled.text`
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
  margin-left: auto;
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
`;


class LobbyTableEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    onClick(){

    }

    render(){
        return(
            <Entry onClick={this.onClick}>
                <EntryText>{this.props.lobbyName}</EntryText>
                <EntryText>{this.props.lobbyID}</EntryText>
                <PortraitContainer>
                    {(this.props.players).map(player=>(
                        <div class="tooltip">
                            <PlayerPortrait isRobot={player.isRobot}/>
                            <span class="tooltiptext">{player.nickname}</span>
                        </div>
                    ))}
                </PortraitContainer>
            </Entry>
        );
    }
}

export default LobbyTableEntry