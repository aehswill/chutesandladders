import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { yellow, orange, purple, blue} from '../lobby/lobbysetupSlice'
import { setTriviaResult, selectTriviaResult, selectTriviaDone, setTriviaDone} from './playSlice';
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';
import BoardComponent from './BoardComponent';
import StartButton from '../../common/StartButton';
import PlayerBox from './HorizonPlayerBoxComponent';
import MessageBoxComponent from './MessageBoxComponent';
import TriviaCardComponent from './TriviaCardComponent';
import Modal from '../../common/Modal';
import {openModal} from '../../common/modalSlice';
import {navigate} from 'hookrouter'
import Cookie from 'universal-cookie';
import axios from 'axios';

export const lobbyID = window.location.href.split("/")[4];


function useInterval(callback, delay){
    const savedCallback = useRef();
    useEffect(()=>{
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=>{
        function tick(){
            savedCallback.current();
        }
        if(delay !== null) {
            const id = setInterval(tick, delay);
            return ()=>{
                clearInterval(id);
            };
        }
    }, [callback, delay]);
}

export default function GamePage(props){
    const dispatch = useDispatch();
    //const getMessages = useSelector(selectMessages());
    const getTriviaDone = useSelector(selectTriviaDone);
    const getTriviaResult = useSelector(selectTriviaResult)
    const getTransform = useSelector(selectTransformTo);
    const [players, setPlayers] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [self, setSelf] = useState({});

    useEffect(()=>{
        // get lobby once on load
        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players/`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
        })
        .then(res=>{
            setPlayers(players=> players = res.data);
            const meIndex = (res.data).findIndex(element=>element.player.player_uid === (new Cookie()).get('player_uid'));
            setSelf(self=> self = (res.data)[meIndex].player);
            setIsHost(isHost => isHost = (res.data)[meIndex].player.isHost);
            setIsMyTurn(isMyTurn => isMyTurn = (res.data)[meIndex].isTurn);
            if(!isMyTurn && isHost && res.data.find(e=>e.isTurn === true).player.isRobot){
                console.log("A robot is playing");
                robotPlay();
            }
        })
    },[])

    useInterval(async ()=>{
        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players/`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
        })
        .then(res=>{
            if(getTriviaDone){
                moveAgain();
                dispatch(setTriviaDone(false));
            }
            setPlayers(players=> players = res.data);
            const meIndex = (res.data).findIndex(element=>element.player.player_uid === (new Cookie()).get('player_uid'));
            setSelf(self=> self = (res.data)[meIndex].player);
            setIsHost(isHost => isHost = (res.data)[meIndex].player.isHost);
            setIsMyTurn(isMyTurn => isMyTurn = (res.data)[meIndex].isTurn);
            if(!isMyTurn && isHost && res.data.find(e=>e.isTurn === true).player.isRobot){
                console.log("A robot is playing");
                robotPlay();
            }
        })
    }, 3000);

    
    
    function moveAgain(){
        var player = players.find(player=>player.isTurn&&player.player.player_uid===getTriviaResult.player_uid);
        var pipeIndex = pipePositions.findIndex(element=>element.start === player.position);
        var moved = false;
        if(getTriviaResult.isCorrect){
            
            if(pipeIndex > -1 && pipePositions[pipeIndex].type === 'green'){
                player.position = pipePositions[pipeIndex].end;
                moved = true;
            }
        }
        else{
            if(pipeIndex > -1 && pipePositions[pipeIndex].type === 'red'){
                player.position = pipePositions[pipeIndex].end;
                moved = true;
            }
        }
        if(moved){
            axios.put(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players/`, player, {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
            })
            .then(res=>{
                setPlayers(res.data);
                /// make sure no win
                axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/next/`, {
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
                })
                    .then(res=>{
                        setPlayers(res.data);
                    })
            });
        }
    }

    function roll(){
        const result = Math.floor(Math.random() * (7-1) + 1);
        if(isMyTurn){
            dispatch(setTransformTo(result));
            var tempSelf = self;
            //pushMessage(`${tempSelf.nickname} rolled a ${result}`);
            if(tempSelf.position + result <= 100){
                tempSelf.position += result;
                setSelf(tempSelf);
                axios.put(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players/`, self, {
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
                })
                .then(res=>{
                    // expecting an updated players list in nice format
                    setPlayers(res.data);
                    let pipeIndex = pipePositions.findIndex(element=> element.start === self.position);
                    if(pipeIndex > -1){
                        dispatch(openModal());
                    }
                    else{
                        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/next/`, {
                            headers: {
                              "Content-Type": "application/json",
                              "Access-Control-Allow-Origin": "*",
                              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
                        })
                        .then(res=>{
                            setPlayers(res.data);
                        })
                    }
                })
            }
            else{
                // tally score
                // navigate to lobby page
                navigate(`/lobby/${window.location.href.split("/")[4]}/leaderboard`);
            }
        }
        return result;
    }

    function robotPlay(){
        const result = Math.floor(Math.random() * (7-1) + 1);
        var bot = players.find(player=>player.isTurn === true).player;
        //pushMessage(`${bot.nickname} rolled a ${result}`);
        if(bot.position + result <= 100){
            bot.position += result;
            axios.put(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players/`, bot, {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
            })
            .then(res=>{
                // expecting an updated players list in nice format
                setPlayers(res.data);
                let pipeIndex = pipePositions.findIndex(element=> element.start === bot.position);
                    if(pipeIndex > -1){
                        // "play" trivia with bot
                        const isCorrect = (Math.floor(Math.random() * (3-1) + 1) === 1);
                        if(isCorrect){
                            //pushMessage(`${bot.nickname} answered the trivia question correctly!`);
                        }
                        else{
                            //pushMessage(`${bot.nickname} answered the trivia question incorrectly.`);
                        }
                    }
                    else{
                        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/next/`, {
                            headers: {
                              "Content-Type": "application/json",
                              "Access-Control-Allow-Origin": "*",
                              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
                        })
                            .then(res=>{
                                setPlayers(res.data);
                            })
                    }
                
            })
        }
        else{
            // tally score
            // navigate to lobby page
            navigate(`/lobby/${window.location.href.split("/")[4]}/leaderboard`);
        }
    }

    /* function pushMessage(message){
        dispatch(addMessage(`[${(new Date()).toLocaleTimeString('en-US')}] ${message}`));
    } */

    function findPlayerPosition(color){
        const index = players.findIndex(e=>e.player.color===color)
        if(index < 0){
            return 1;
        }
        else return players[index].player.position;
    }
    return(
        <>
        <Modal content={TriviaCardComponent}/>
        <OuterContainer>
            <TopContainer>
                <ControlBox>
                    <PlayerBox players={players}/>
                    <DieComponent roll={roll} transformTo={getTransform} isActive={isMyTurn}/>
                </ControlBox>
                <ButtonBox>
                <button onClick={()=>dispatch(openModal())}>Open Trivia</button>
                    <StartButton text="QUIT"/>
                </ButtonBox>
            </TopContainer>
            <BoardComponent 
                orangePosition={findPlayerPosition(orange)} 
                yellowPosition={findPlayerPosition(yellow)} 
                bluePosition={findPlayerPosition(blue)} 
                purplePosition={findPlayerPosition(purple)} />
        </OuterContainer>
            
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
