import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUserID, setIsHost } from '../start/gamesetupSlice'
import {selectUserID, selectIsHost, selectUser} from '../start/gamesetupSlice'
import { yellow, orange, purple, blue} from '../lobby/lobbysetupSlice'
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';
import BoardComponent from './BoardComponent';
import StartButton from '../../common/StartButton';
import PlayerBox from './HorizonPlayerBoxComponent';
import MessageBoxComponent from './MessageBoxComponent';
import TriviaCardComponent from './TriviaCardComponent';
import Modal from '../../common/Modal';
import {openModal} from '../../common/modalSlice';
import Cookie from 'universal-cookie';
import axios from 'axios';

export const lobbyID = window.location.href.split("/")[4];

export default function GamePage(props){
    const dispatch = useDispatch();
    const getTransform = useSelector(selectTransformTo);
    const [messages, setMessages] = useState([]);
    const [players, setPlayers] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [status, setStatus] = useState("");
    const [self, setSelf] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate/players`)
        .then(res=>{
            setPlayers(res.data);
            const meIndex = (res.data).findIndex(element=>element.player.player_uid === (new Cookie()).get('player_uid'));
            setSelf((res.data)[meIndex].player);
            setIsHost((res.data)[meIndex].player.isHost);
            setIsMyTurn((res.data)[meIndex].isTurn);
        })
        /* .then(res=>{
            setLobby(res.data);
            initValues(res.data);
        

            const int = setInterval(()=>{
                const url = window.location.href;
                const id = url.split("/")[4];
                if(status === 'playing'){
                    setIsMyTurn(true);
                    console.log('playing')
                }
                else if(status === 'waiting'){
                    setIsMyTurn(false);
                    // enable loading component?
                    
                        var lob = getLobby(id);
                        setOrangePosition(lob.gamestate.board_positions.orange);
                        setBluePosition(lob.gamestate.board_positions.blue);
                        setPurplePosition(lob.gamestate.board_positions.purple);
                        setYellowPosition(lob.gamestate.board_positions.yellow);
                        
                        initValues(lob);
                
                    
                } 
            }, 1000)
        }) */
    },[])
/* 
    function initValues(lob){
        console.log(lob);
        setPlayers(lob.players);
        setMessages(lob.messages);
        let me = (new Cookie()).get('player_uid');
        if(lob.gamestate.turn === 0){
            players.forEach(player=>{
                if(me === player.player_uid){
                    if(player.isHost){
                        const lobbyCopy = JSON.parse(JSON.stringify(lob));
                        setIsHost(true);
                        setIsMyTurn(true);
                        lobbyCopy.gamestate.turn++;
                        lobbyCopy.gamestate.active_player = me;
                        updateLobby(lobbyCopy);
                        setStatus('playing');
                        console.log('playing')
                    }
                    else{
                        setStatus('waiting');
                        console.log('waiting')
                    }
                }
            })
        }
        else{
            console.log(lob);
            if(lob.gamestate.active_player.isRobot && isHost){
                // robot play
                console.log("robots turn");
            }
            else if(lob.gamestate.active_player.player_uid === me){
                // play                
                console.log("my turn");

            }
            else{
                // wait
                console.log("waiting");

            }
        }
    }

    function getLobby(id){
        axios.get(`http://localhost:5000/api/v1/lobbies/${id}`)
        .then(lobby=>{
            return lobby.data;
        })
        .catch(error=>{
            return("Error in GameHelper.getLobby: " + error);
        })
    } */

    function roll(){
        const result = Math.floor(Math.random() * (7-1) + 1);
        if(isMyTurn){
            dispatch(setTransformTo(result));
            axios.put(`http://localhost:5000/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate`)
        }
        return result;
    }

/* 
    function updateLobby(lobby){
        axios.put(`http://localhost:5000/api/v1/lobbies/${lobby.id}/gamestate`, lobby)
            .then(gamestate=>{
                return gamestate.data
            })
            .catch(error=>{
                console.log("Error in GameHelper.updateGamestate: " + error);
                return null;
            })
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
        // set backend
    }

    function pushMessage(message){
        var lobbyCopy = JSON.parse(JSON.stringify(lobby));
        lobbyCopy.gamestate.messages.push(`[${(new Date()).toLocaleTimeString('en-US')}] ${message}`);
        return lobbyCopy;
    }

    function getNextPlayer(players){
        let indexOfCurrent = players[players.indexOf(lobby.gamestate.active_player)];
        // if we're at the end of the list, start over at the begining
        let indexOfNext = indexOfCurrent > 3 ? 0 : indexOfCurrent + 1;
        return players[indexOfNext];
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
        <MessageBoxComponent messages={messages}/>
            
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
