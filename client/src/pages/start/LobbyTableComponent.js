import React from 'react'
import styled from 'styled-components'
import LobbyEntryComponent from './LobbyEntryComponent';
import lobbies from '../../mockData/mockLobbies'


export default function LobbyTable(props){

    
    function getLobbies(){
        // GET lobbies API call
        // this function shall return a JSON document of the lobbies (see mockLobbies file for format)
    }
    
    return(
        <ListBox>
            <InnerScroll>
            {(lobbies).map(lobby => (
                <LobbyEntryComponent lobbyName={lobby.name} lobbyID={lobby.id} players={lobby.players} click={props.onClick}/>
            ))}
            </InnerScroll>
        </ListBox>
    );
}

// STYLE
const ListBox = styled.ul`
  list-style-type: none;
  height: 390px;
  width: 550px;
  background: #881400;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  border: 2px solid rgba(10,10,10,0.25);
  border-radius: 16px;
  filter: drop-shadow(0px 24px 38px rgba(0,0,0,0.14)) drop-shadow(0px 9px 46px rgba(0,0,0,0.12)) drop-shadow(0px 11px 15px rgba(0,0,0,0.2));
  align-self: center;
  justify-self: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #504F4F;
  padding: 24px 12px;
  
  overflow-x: hidden;
  overflow-y: auto;
`;

const InnerScroll = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    height: 390px;
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;