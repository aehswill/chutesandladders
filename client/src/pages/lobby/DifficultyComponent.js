// I am a modal
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import close from '../../assets/icons/close.png'
import PopupButton from '../../common/PopupButton';
import { selectPlayers, setDifficulty, setHasStarted, setPlayers } from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'
import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken } from './lobbysetupSlice'
import { selectLobbyID, selectUserID } from '../start/gamesetupSlice';
import { navigate } from 'hookrouter'
import axios from 'axios';

export default function DifficultyComponent(props){
    const dispatch = useDispatch();
    const getUserID = useSelector(selectUserID);
    const getLobbyID = useSelector(selectLobbyID);
    const getPlayers = useSelector(selectPlayers);
    const [easySelected, selectEasy] = useState(true);
    const [mediumSelected, selectMedium] = useState(false);
    const [hardSelected, selectHard] = useState(false);

    const blueTaken = useSelector(selectIsBlueTaken);
    const orangeTaken = useSelector(selectIsOrangeTaken);
    const purpleTaken = useSelector(selectIsPurpleTaken);
    const yellowTaken = useSelector(selectIsYellowTaken);

    function onClick(){

        var bt = false;
        var ot = false;
        var yt = false;
        var pt = false;
        const newColors = [];
        getPlayers.forEach((player)=>{
            if(player.player_uid === getUserID){
                switch(player.color){
                    case blue:
                        bt = true;
                        break;
                    case purple:
                        pt = true;
                        break;
                    case orange:
                        ot = true;
                        break;
                    case yellow:
                        yt = true;
                        break;
                    default:
                        break;
                }
            }
            if(player.color === "transparent"){
                if(!blueTaken && !bt){
                    dispatch(setIsBlueTaken(true));
                    player.color = blue;
                    bt = true;
                }
                else if(!orangeTaken && !ot){
                    dispatch(setIsOrangeTaken(true));
                    player.color = orange;
                    ot = true;
                }
                else if(!yellowTaken && !yt){
                    dispatch(setIsYellowTaken(true));
                    player.color = yellow;
                    yt = true;
                } 
                else if(!purpleTaken && !pt){
                    dispatch(setIsPurpleTaken(true));
                    player.color = purple;
                    pt = true;
                } 
            }
            newColors.push(player);
        })
        console.log(newColors);
        dispatch(setPlayers(newColors));
            console.log(getPlayers)
            const mode = easySelected?"easy":(mediumSelected?"medium":"hard");
                dispatch(setDifficulty(mode));
                const url = window.location.href;
                const id = url.split("/")[4];
                var tempLobby;
                axios.get(`http://localhost:5000/api/v1/lobbies/${id}/`)
                .then((lobby) => {
                    tempLobby = lobby.data;
                    tempLobby.players = newColors;
                    tempLobby.gamestate.hasStarted = true;
                    tempLobby.gamestate.turn = 1;
                    tempLobby.gamestate.active_player_uid = newColors[0].player_uid;
                    console.log(tempLobby);
                    axios.put(`http://localhost:5000/api/v1/lobbies/${id}/gamestate/`, tempLobby)
                    .then(response=>{
                        console.log(response.data)
                        dispatch(setHasStarted(true));
                        props.close();
                        navigate(`/lobby/${getLobbyID}/game`);
                    })
                })
                .catch(error=>console.log(error));
    }

    return(
        <OuterContainer>
            <ModalClose onClick={props.close}>
                <img src={close} alt="close"/>
            </ModalClose>
            <InnerContainer>
                <PopupTitle>Bot Difficulty</PopupTitle>
                <PopupButton text="Easy" color={easySelected?"#FF9869":"#B8572C"} click={()=>{
                    selectEasy(true);
                    selectMedium(false);
                    selectHard(false);
                }}/>
                <PopupButton text="Medium" color={mediumSelected?"#FF9869":"#B8572C"} click={()=>{
                    selectEasy(false);
                    selectMedium(true);
                    selectHard(false);
                }}/>
                <PopupButton text="Hard" color={hardSelected?"#FF9869":"#B8572C"} click={()=>{
                    selectEasy(false);
                    selectMedium(false);
                    selectHard(true);
                }}/>
                <PopupButton text="Enter Game" isDisabled={false} click={onClick}/>
            </InnerContainer>
        </OuterContainer>
    );
}

//text click isDisabed

// STYLE
const OuterContainer =styled.div`
    position: absolute;

    width: 430px;
    height: 540px;
    border: 3px solid;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #FF9869;
    background-blend-mode: soft-light, normal;
    border-radius: 16px;
    filter: drop-shadow(0px 24px 38px rgba(0,0,0,0.14)) drop-shadow(0px 9px 46px rgba(0,0,0,0.12)) drop-shadow(0px 11px 15px rgba(0,0,0,0.2));
`;
const InnerContainer = styled.div`
    position: absolute;
    left: 2.39%;
    right: 2.39%;
    top: 12%;
    bottom: 5.35%;
    padding-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 3px solid;
    border-radius: 8px;
    border-image-source: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.5) 100%);
    background: #881400;
`;
//background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.25) 100%), #881400;
const PopupTitle = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 35px;
    margin: 0px;
    margin-top: 20px;
    color: #FFFFFF;
    text-shadow: 0px 2px 4px rgba(91, 26, 26, 0.14), 0px 3px 4px rgba(123,12,12,0.12), 0px 1px 5px rgba(136,13,13,0.2);
`;
const ModalClose = styled.span`
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 24px;
    cursor: pointer;
`;