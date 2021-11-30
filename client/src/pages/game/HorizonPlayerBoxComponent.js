import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import {selectPlayers, setPlayers} from '../lobby/lobbysetupSlice'
import { selectLobbyID } from '../start/gamesetupSlice'
import PlayerComponent from './PlayerComponent';
import axios from 'axios';

export default function HorizonPlayerBoxComponent(props){
    const dispatch = useDispatch();
    const getLobbyID = useSelector(selectLobbyID);
    const getPlayers = useSelector(selectPlayers);

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/lobbies/${getLobbyID}/players`)
        .then((players) => {
            dispatch(setPlayers(players.data));
        })
        .catch(function(error){
            console.log({
                message: error.message
            })
        })
    })
    return(
        <Box>
            <List>
            {(getPlayers).map(player=>(
                <PlayerComponent player={player}/>

            ))}
            </List>
        </Box>
    )
}

//STYLE
const Box = styled.div`
    display: flex;
    justify-contents: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #2E9BFF;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(255,255,255,0.35);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 27px 24px;
    height: 83px;
`;
const List = styled.ul`
    height: 83px;
    padding: 0px;
    margin: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-contents: space-evenly;
    align-items: center;
    gap: 25px;
`;