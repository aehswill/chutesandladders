import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerEntryComponent from './PlayerEntryComponent';
import axios from 'axios';
import { selectHasStarted, setPlayers, setHasStarted} from './lobbysetupSlice'
import { useSelector, useDispatch } from 'react-redux';
import { setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken} from './lobbysetupSlice'
import { setUser, setUserID, setIsHost, setLobbyID, setLobbyNickname, selectLobbyID} from '../start/gamesetupSlice'
//import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'
import Cookie from 'universal-cookie';
import { navigate } from 'hookrouter';

/**
 * [req 3.7.2.3] List of players in lobby
 * 
 * @param {*} props 
 * @returns 
 */

export default function PlayerBoxComponent(props){
    const dispatch = useDispatch();
    const [players, setPlayersLocal] = useState([]);
    const getLobbyID = useSelector(selectLobbyID);
    const getHasStarted = useSelector(selectHasStarted);


    const url = window.location.href;
    const id = url.split("/")[4];
    useEffect(()=>{
        const interval = setInterval(()=> {
            const res = axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${id}/`, {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
            });
            res.then((lobby) => {
                // restore redux state from database
                const temp = [];
                (lobby.data.players).forEach(player=>temp.push(player));
                dispatch(setLobbyID(lobby.data.id));
                dispatch(setLobbyNickname(lobby.data.name));
                dispatch(setPlayers(temp));
                dispatch(setHasStarted(lobby.data.gamestate.hasStarted));
                setPlayersLocal(temp);
                (players).forEach(player=>{
                    const cookie = new Cookie();
                    if(cookie.get('player_uid') === player.player_uid && player.isHost){
                        dispatch(setUser(player.nickname));
                        dispatch(setUserID(player.player_uid));
                        dispatch(setIsHost(true));
                    }
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
                
                if(getHasStarted){
                    clearInterval(interval);
                    navigate(`/lobby/${getLobbyID}/game`);
                }
            })
            .catch(function(error){
                console.log({message: error.message})
            })
        }, 1000)
    },[])

    return(
        <Box>
            Players
            <Separator />
            <List>
            {(players).map(player=>(
                <PlayerEntryComponent player={player}/>

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