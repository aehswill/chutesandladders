import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import {selectPlayers, setDifficulty, setPlayers, selectDifficulty} from '../lobby/lobbysetupSlice'
import { setUser, setUserID, setIsHost, setLobbyID, setLobbyNickname} from '../start/gamesetupSlice'
import { addMessage, setTurn, setActivePlayer, setTriviaQuestions } from './playSlice'
import {selectMessages, selectTurn, selectActivePlayer} from './playSlice'
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';
import BoardComponent from './BoardComponent';
import StartButton from '../../common/StartButton'
import PlayerBox from './HorizonPlayerBoxComponent'
import MessageBoxComponent from './MessageBoxComponent'
import TriviaCardComponent from './TriviaCardComponent';
import Modal from '../../common/Modal'
import {openModal} from '../../common/modalSlice';
import Cookie from 'universal-cookie'
import axios from 'axios'

export default function GamePage(props){
    const dispatch = useDispatch();
    const getTransform = useSelector(selectTransformTo);
    const getTurn = useSelector(selectTurn);
    const getActivePlayer = useSelector(selectActivePlayer);
    const getDifficulty = useSelector(selectDifficulty);
    const players = [];

    const url = window.location.href;
    const id = url.split("/")[4];

    React.useEffect(()=>{
        axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${getDifficulty}&type=boolean`)
        .then((res)=>{
            console.log(res.data.results);
            const temp = (res.data.results).map((result)=>{
                return ({question: result.question, correct_answer: result.correct_answer, incorrect_answers: result.incorrect_answers})
            })
            dispatch(setTriviaQuestions(temp));
        })
        .catch((error)=>{
            console.log(error)
        });
    },[])

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/lobbies/${id}`)
        .then((lobby) => {
            (lobby.data.players).forEach(player=>players.push(player));
            dispatch(setLobbyID(lobby.data.id));
            dispatch(setLobbyNickname(lobby.data.name));
            dispatch(setPlayers(players));
            dispatch(setDifficulty(lobby.data.difficulty));
            (lobby.data.gamestate.messages).forEach(message=>dispatch(addMessage(message)));
            dispatch(setActivePlayer(lobby.data.gamestate))
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

    function PlayGame(){
        // if it's my turn, 
            // set waiting false
            // roll the die
            // put
            // move token animation
            // if the token lands on a pipe, pull trivia
            // put
            // move token animation
            // calculate score
            // change active player and turn
            // put
        // else if I'm the host and the active player is a robot
            // auto roll
            // move
            // answer trivia
            // move
            // calculate score
        // else wait = true
    }

    const roll= ()=>{
        const result = Math.floor(Math.random() * (7-1) + 1);
        dispatch(setTransformTo(result));
    }

    return(
        <>
        <Modal content={TriviaCardComponent}/>
        <OuterContainer>
            <TopContainer>
                <ControlBox>
                    <PlayerBox />
                    <DieComponent roll={roll} transformTo={getTransform}/>
                </ControlBox>
                <ButtonBox>
                <button onClick={()=>dispatch(openModal())}>Open Trivia</button>
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
