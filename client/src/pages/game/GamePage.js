import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUserID, setIsHost } from '../start/gamesetupSlice'
import {selectUserID, selectIsHost, selectUser} from '../start/gamesetupSlice'
import { fetchTrivia, fetchLobby, sendGamestate} from './playSlice'
import {selectTriviaQuestions, selectLobby, selectStatus, selectTriviaStatus} from './playSlice'
import { yellow, orange, purple, blue} from '../lobby/lobbysetupSlice'
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
import Player from '../../model/Player';

export default function GamePage(props){
    const dispatch = useDispatch();
    const [orangePosition, setOrangePosition] = useState(1);
    const [purplePosition, setPurplePosition] = useState(1);
    const [bluePosition, setBluePosition] = useState(1);
    const [yellowPosition, setYellowPosition] = useState(1);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const lobby = useSelector(selectLobby);
    const status = useSelector(selectStatus);
    const triviaStatus = useSelector(selectTriviaStatus);

    const getTransform = useSelector(selectTransformTo);
    const getTrivia = useSelector(selectTriviaQuestions);

    const getIsHost = useSelector(selectIsHost);
    const getUserID = useSelector(selectUserID);
    const getUser = useSelector(selectUser);

    const cookie = new Cookie();
    
    
    React.useEffect(()=>{
        dispatch(fetchLobby());
        if(status === "fulfilled"){
            console.log(lobby)
            dispatch(fetchTrivia(lobby.difficulty));
                if(triviaStatus === "fulfilled"){
                const index = lobby.players.findIndex(player=>player.player_uid === cookie.get('player_uid'));
                dispatch(setUser(lobby.players[index].nickname));
                dispatch(setUserID(lobby.players[index].player_uid));
                dispatch(setIsHost(lobby.players[index].isHost));
                
                if(lobby.gamestate.turn===0 && getIsHost){
                    const player = lobby.players.find(player=>player.player_uid===getUserID);
                    const gs = JSON.parse(JSON.stringify(lobby.gamestate));
                    gs.active_player = player;
                    dispatch(sendGamestate(gs))
                }
                const activePlayer = lobby.gamestate.active_player;
                if(activePlayer.player_uid === getUserID){
                    setIsMyTurn(true);
                }
                else if(activePlayer.isRobot && getIsHost){
                    const name = activePlayer.nickname;
                    //dispatch(addMessage(`${name}'s turn'`));
                    //send
                    const robotRoll = roll();
                    //dispatch(addMessage(`${name} rolled a ${robotRoll}`));
                    //send
                    setPosition(activePlayer.color, robotRoll);
                    //send

                    // check if won
                    const pipesIndex = pipePositions.findIndex(element=>element.start===robotRoll);
                    if(pipesIndex > -1){
                        const choice = (Math.floor(Math.random() * (3-1) + 1)) === 1?"true":"false";
                        //dispatch(addMessage(`Question: ${getTrivia[3].question}`));
                        var isCorrect = false;
                        if(choice.toLowerCase() === getTrivia[3].correct_answer.toLowerCase()){
                            //dispatch(addMessage("Player answered correctly"))
                            isCorrect = true;
                        }
                        else{
                            //dispatch(addMessage(`Player answered incorrectly. The correct answer is ${getTrivia[3].correct_answer}`))
                        }
                        if((isCorrect && pipePositions[pipesIndex].type === 'green') || (!isCorrect && pipePositions[pipesIndex].type === 'red')){
                            setPosition(activePlayer.color, pipePositions[pipesIndex].end);
                            // check if won
                        }
                    }
                    const turnNo = lobby.gamestate.turn + 1;
                    const index = lobby.players[lobby.players.indexOf(activePlayer)];
                    const nextIndex = index > 3 ? 0 : index;
                    const nextPlayer = lobby.players[nextIndex];
                    var tempGamestate = lobby.gamestate;
                    tempGamestate.active_player = nextPlayer;
                    tempGamestate.turn = turnNo;
                    
                    // score
                    return ()=>{
                        dispatch(sendGamestate(tempGamestate));
                    }
                }
            }
        }
    })

    
    //var localActivePlayer = new Player("","", false, false);
    

        /* const res = axios.get(`http://localhost:5000/api/v1/lobbies/${id}`);
        res.then((lobby) => {
            setGamestate(lobby.data.gamestate);
            (lobby.data.players).forEach(player=>players.push(player));
            dispatch(setLobbyID(lobby.data.id));
            dispatch(setLobbyNickname(lobby.data.name));
            dispatch(setPlayers(players));
            dispatch(setDifficulty(lobby.data.difficulty));
            //(lobby.data.gamestate.messages).forEach(message=>dispatch(addMessage(message)));
            
            (players).forEach(player=>{
                const cookie = new Cookie();
                if(cookie.get('playerID') === player.player_uid){
                    dispatch(setUser(player.nickname));
                    dispatch(setUserID(player.player_uid));
                    if(player.isHost){
                        dispatch(setIsHost(true));
                    }
                }
            })
            console.log(`turn ${getTurn}, isHost ${getIsHost}`);
            if(getTurn===0 && getIsHost){
                const player = players.find(player=>player.player_uid===getUserID);
                dispatch(setActivePlayer(player));
                localActivePlayer = player;
                var tempGamestate = gamestate;
                // tempGamestate.active_player = player;
                // axios.put(`http://localhost:5000/api/v1/lobbies/${id}/gamestate`, tempGamestate)
                // .then(res=> console.log(res)); 
            }
            else{
                console.log(gamestate)
                dispatch(setActivePlayer(gamestate.active_player));
                localActivePlayer = gamestate.active_player;
                console.log(localActivePlayer);
            }
            if(localActivePlayer.player_uid === getUserID){
                setIsMyTurn(true);
            }
            else if(localActivePlayer.isRobot && getIsHost){
                const name = players.indexOf(localActivePlayer).nickname;
                dispatch(addMessage(`${name}'s turn'`));
                //send
                const robotRoll = roll();
                dispatch(addMessage(`${name} rolled a ${robotRoll}`));
                //send
                setPosition(localActivePlayer.color, robotRoll);
                //send
    
                // check if won
                const pipesIndex = pipePositions.findIndex(element=>element.start===robotRoll);
                if(pipesIndex > -1){
                    const choice = (Math.floor(Math.random() * (3-1) + 1)) === 1?"true":"false";
                    dispatch(addMessage(`Question: ${getTrivia[3].question}`));
                    var isCorrect = false;
                    if(choice.toLowerCase() === getTrivia[3].correct_answer.toLowerCase()){
                        dispatch(addMessage("Player answered correctly"))
                        isCorrect = true;
                    }
                    else{
                        dispatch(addMessage(`Player answered incorrectly. The correct answer is ${getTrivia[3].correct_answer}`))
                    }
                    if((isCorrect && pipePositions[pipesIndex].type === 'green') || (!isCorrect && pipePositions[pipesIndex].type === 'red')){
                        setPosition(localActivePlayer.color, pipePositions[pipesIndex].end);
                        // check if won
                    }
                }
                const turnNo = getTurn + 1;
                dispatch(setTurn(turnNo));
                const index = players[players.indexOf(getActivePlayer)];
                const nextIndex = index > 3 ? 0 : index;
                dispatch(setActivePlayer(players[nextIndex]));
                localActivePlayer = players[nextIndex];
                tempGamestate = gamestate;
                tempGamestate.active_player = players[nextIndex];
                tempGamestate.turn = turnNo;
                axios.put(`http://localhost:5000/api/v1/lobbies/${id}/gamestate`, tempGamestate)
                .then(res=> console.log(res));
                // score
                // send gamestate
            }
        })
        .catch(error=>{
            console.log({
                message: error.message
            })
        }) */

    async function PlayerPlay(roll){
        //dispatch(addMessage(`${getUser}'s turn`));
        await sleep(2000);
        //dispatch(addMessage(`${getUser} rolled a ${roll}`));
        setPosition(lobby.gamestate.active_player.color, roll);
        const pipesIndex = pipePositions.findIndex(element=>element.start===roll);
        if(pipesIndex > -1){
            dispatch(openModal());
            if((lobby.gamestate.player_trivia_answer && pipePositions[pipesIndex].type === 'green') || (!lobby.gamestate.player_trivia_answer && pipePositions[pipesIndex].type === 'red')){
                setPosition(lobby.gamestate.active_player.color.color, pipePositions[pipesIndex].end);
                // check if won

            }
        }
        const tempLobby = lobby;
        tempLobby.gamestate.turn++;
        const index = lobby.players[lobby.players.indexOf(lobby.gamestate.active_player)];
        const nextIndex = index > 3 ? 0 : index;
        tempLobby.gamestate.active_player = lobby[nextIndex];
        dispatch(sendGamestate(tempLobby.gamestate));

    }

    async function snooze(time){
        await sleep(time);
    }
    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve, ms));
    }

    function processWin(){
        // calculate all scores
        // send to db
        // navigate to lobby page
    }

    function setPosition(color, position){
        switch(color){
            case blue:
                setBluePosition(position);
                break;
            case purple:
                setPurplePosition(position);
                break;
            case orange:
                setOrangePosition(position);
                break;
            case yellow:
                setYellowPosition(position);
                break;
            default:
                break;
        }
    }

    function roll(){
        const result = Math.floor(Math.random() * (7-1) + 1);
        if(lobby.gamestate.active_player.player_uid === getUserID){
            dispatch(setTransformTo(result));
            PlayerPlay(result);
        }
        return result;
    }

    return(
        <>
        <Modal content={TriviaCardComponent}/>
        <OuterContainer>
            <TopContainer>
                <ControlBox>
                    <PlayerBox />
                    <DieComponent roll={roll} transformTo={getTransform} />
                </ControlBox>
                <ButtonBox>
                <button onClick={()=>dispatch(openModal())}>Open Trivia</button>
                    <StartButton text="QUIT"/>
                </ButtonBox>
            </TopContainer>
            <BoardComponent orangePosition={orangePosition} yellowPosition={yellowPosition}
             bluePosition={bluePosition} purplePosition={purplePosition}/>
        </OuterContainer>
        <MessageBoxComponent />
            
        </>
    )
}

const pipePositions = [
    {type:"green", start:1, end:38},
    {type:"green", start:4, end:14},
    {type:"green", start:9, end:31},
    {type:"green", start:28, end:84},
    {type:"green", start:21, end:42},
    {type:"green", start:36, end:44},
    {type:"green", start:51, end:67},
    {type:"green", start:71, end:91},
    {type:"green", start:80, end:100},

    {type:"red", start:16, end:6},
    {type:"red", start:48, end:28},
    {type:"red", start:49, end:11},
    {type:"red", start:56, end:53},
    {type:"red", start:62, end:19},
    {type:"red", start:64, end:60},
    {type:"red", start:87, end:24},
    {type:"red", start:93, end:73},
    {type:"red", start:95, end:75},
    {type:"red", start:98, end:78}
]

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
