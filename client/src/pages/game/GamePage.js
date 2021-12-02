import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import {selectPlayers, setPlayers} from '../lobby/lobbysetupSlice'
import { setUser, setUserID, setIsHost, setLobbyID, setLobbyNickname} from '../start/gamesetupSlice'
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';
import BoardComponent from './BoardComponent';
import StartButton from '../../common/StartButton'
import PlayerBox from './HorizonPlayerBoxComponent'
import MessageBoxComponent from './MessageBoxComponent'
import Cookie from 'universal-cookie'
import axios from 'axios'

export default function GamePage(props){
    const dispatch = useDispatch();
    const getTransform = useSelector(selectTransformTo);
    const players = [];

    const url = window.location.href;
    const id = url.split("/")[4];
    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/lobbies/${id}`)
        .then((lobby) => {
            (lobby.data.players).forEach(player=>players.push(player));
            dispatch(setLobbyID(lobby.data.id));
            dispatch(setLobbyNickname(lobby.data.name));
            dispatch(setPlayers(players));
            (players).forEach(player=>{
                const cookie = new Cookie();
                if(cookie.get('playerID') === player.player_uid && player.isHost){
                    dispatch(setUser(player.nickname));
                    dispatch(setUserID(player.player_uid));
                    dispatch(setIsHost(true));
                }
            })
        })
        .catch(function(error){
            console.log({
                message: error.message
            })
        })
    })
    const roll= ()=>{
        dispatch(setTransformTo(Math.floor(Math.random() * (7-1) + 1)));
    }

    return(
        <>
        <OuterContainer>
            <TopContainer>
                <ControlBox>
                    <PlayerBox />
                    <DieComponent roll={roll} transformTo={getTransform}/>
                </ControlBox>
                <ButtonBox>
                    <StartButton text="QUIT"/>
                </ButtonBox>
            </TopContainer>
            <BoardComponent/>
        </OuterContainer>
        <MessageBoxComponent />
        </>
    )
}
//<DieComponent roll={roll} transformTo={getTransform}/>

// STYLE
const OuterContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;
const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 400px;
`;
const ControlBox = styled.div`
    margin-top: 44px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;
const ButtonBox = styled.div`
    margin-top: 44px;
    margin-right: 20px;
    margin-left: auto;
`;
