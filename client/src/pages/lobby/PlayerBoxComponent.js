import React, { useEffect } from 'react'
import styled from 'styled-components'
import PlayerEntryComponent from './PlayerEntryComponent';
import axios from 'axios';
import { selectLobbyID} from '../start/gamesetupSlice'
import { selectPlayers, setPlayers } from './lobbysetupSlice'
import { useSelector, useDispatch } from 'react-redux';
import { setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken} from './lobbysetupSlice'
//import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'

export default function PlayerBoxComponent(props){
    const dispatch = useDispatch();
    const getPlayers = useSelector(selectPlayers);
    //const url = window.location.href;
    //const getLobbyID = url.substring(url.lastIndexOf('/') + 1);
    const getLobbyID = useSelector(selectLobbyID);
    const players = [];

    const res = axios.get(`http://localhost:5000/api/v1/lobbies/${getLobbyID}/`);
        res.then((lobby) => {
            (lobby.data.players).forEach(player=>players.push(player));
            dispatch(setPlayers(players));

            (players).forEach(player=>{
                switch(player.color){
                    case orange:
                        dispatch(setIsOrangeTaken(true));
                        break;
                    case yellow:
                        dispatch(setIsYellowTaken(true));
                        break;
                    case purple:
                        dispatch(setIsPurpleTaken(true));
                        break;
                    case blue:
                        dispatch(setIsBlueTaken(true));
                        break;
                    default:
                        break;
                }
            })
        })
        .catch(function(error){
            console.log({
                message: error.message
            })
        })

    return(
        <Box>
            Players
            <Separator />
            <List>

            {(getPlayers).map(player=>(
                <PlayerEntryComponent player={player}/>

//             {(players).map(player=>(
//                  <PlayerEntryComponent player={player}/>


            ))}
            </List>
        </Box>
    );
}

// STYLE
const Box = styled.div`
    margin: 20px 0px;
    background: linear-gradient(180deg, rgba(0,0,0,0.125) 0%, rgba(255,255,255,0.25) 100%), #00B800;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(0,0,0,0.35);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 42px 23px;
    width: 415px;
    height: 420px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 35px;
    color: white;
`;
const List = styled.ul`
    width: 350px;
    height: 280px;
    padding: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-contents: space-evenly;
`;
const Separator = styled.div`
    background-color: white;
    height: 2px;
    width: 350px;
    margin: 10px 0px;
`; 