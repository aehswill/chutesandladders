import React from 'react'
import styled from 'styled-components'
import LobbyTableEntry from './LobbyTableEntry';
import lobbies from '../mockData/mockLobbies'

const Table = styled.table`
  height: 390px;
  width: 640px;
  margin: 12px;
  background: #881400;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  border: 2px solid rgba(10,10,10,0.25);
  border-radius: 8px;
  filter: drop-shadow(0px 24px 38px rgba(0,0,0,0.14)) drop-shadow(0px 9px 46px rgba(0,0,0,0.12)) drop-shadow(0px 11px 15px rgba(0,0,0,0.2));
  align-self: center;
  justify-self: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #504F4F;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const TableRow = styled.tr`
`;

/*const TableHeader = styled.th`
  background-color: white;
  height: 45px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-radius: 4px;
`; */

// add API query to get list of lobbies (maybe just the lobby controller?)

class LobbyTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    render(){
        return(
            <Table>
                {/* <tr>
                    <TableHeader>Lobby</TableHeader>
                </tr> */}
                <tbody>
                {(lobbies).map(lobby => (
                    <TableRow>
                        <LobbyTableEntry lobbyName={lobby.name} lobbyID={lobby.id} players={lobby.players}/>
                    </TableRow>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default LobbyTable