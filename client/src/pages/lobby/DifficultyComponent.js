// I am a modal
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import close from '../../assets/icons/close.png'
import PopupButton from '../../common/PopupButton';
import { selectDifficulty, selectPlayers, setDifficulty } from './lobbysetupSlice'
import { selectLobbyID } from '../start/gamesetupSlice';
import {fetchLobby} from '../game/playSlice';
import { navigate } from 'hookrouter'
import axios from 'axios';

export default function DifficultyComponent(props){
    const dispatch = useDispatch();
    const getDifficulty = useSelector(selectDifficulty);
    const getLobbyID = useSelector(selectLobbyID);
    const [easySelected, selectEasy] = useState(true);
    const [mediumSelected, selectMedium] = useState(false);
    const [hardSelected, selectHard] = useState(false);

    function onClick(){
        const mode = easySelected?"easy":(mediumSelected?"medium":"hard");
        dispatch(setDifficulty(mode));
        console.log(`Lobby difficulty set to ${getDifficulty}`);
        const url = window.location.href;
        const id = url.split("/")[4];
        var gamestate;
        const res = axios.get(`http://localhost:5000/api/v1/lobbies/${id}/`);
        console.log(res);
        res.then((lobby) => {
            gamestate = lobby.data.gamestate;
            gamestate.hasStarted = true;
            const r = axios.put(`http://localhost:5000/api/v1/lobbies/${id}/gamestate/`, gamestate);
            r.then(response=>{
                console.log(response);
            })
        })
        .catch(error=>console.log(error));
        snooze(2000);
        navigate(`/lobby/${getLobbyID}/game`);
        props.close();
    }

    async function snooze(time){
        await sleep(time);
    }
    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve, ms));
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