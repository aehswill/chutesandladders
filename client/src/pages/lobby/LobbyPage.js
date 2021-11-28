import React, { useEffect } from 'react';
import {useState} from 'react'
import styled from 'styled-components'
import ToggleComponent from './ToggleComponent'
import DifficultyComponent from './DifficultyComponent'
import PlayerBoxComponent from './PlayerBoxComponent'
import ColorSelectorComponent from './ColorSelectorComponent'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "../../common/Modal"
import { openModal } from '../../common/modalSlice'
import axios from 'axios'
import Player from '../../model/Player'
import PlayerEntryComponent from './PlayerEntryComponent'
import StartButton from '../../common/StartButton'
import { setIsPublicGame, selectIsPublicGame } from './lobbysetupSlice';
import Cookies from 'universal-cookie';

// get lobby info here
export default function LobbyPage(props){
    const cookies = new Cookies();
    const [color, setColor] = useState("");
    const [getLobbyName, setLobbyName] = useState();
    const url = window.location.href;
    const getLobbyID = url.substring(url.lastIndexOf('/') + 1);

    axios.get(`http://localhost:5000/api/v1/lobbies/${getLobbyID}`)
        .then((lobby) => {
            setLobbyName(lobby.data.name);
        })
        .catch(function(error){
            console.log({
                message: error.message
            })
        })

    const dispatch = useDispatch();
    

    function setColorAndDispatch(c){
        setColor(c);
        dispatch()
    }
    // how to handle polling for new players on public?
    // non blocking request every x seconds? (async)
    const click = () => {
        dispatch(openModal());
      }

    return(
        <>
        <Modal content={DifficultyComponent} />
        <Outer>
            <Container>
                <ToggleComponent/>
                <div>
                    <TitleBox>
                        <h1>{getLobbyName}</h1>
                        <h1>{getLobbyID}</h1>
                    </TitleBox>
                    <PlayerBoxComponent/>
                </div>
                <ColorSelectorComponent chooseColorHandler={setColor}/>
            </Container>
            <ButtonContainer>
                <StartButton text="GO" click={click}/>
            </ButtonContainer>
        </Outer>
        </>
    )
}

// STYLE
const Outer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
const Container = styled.div`
    position: absolute;
    top: 260px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: top;
    gap: 111px;
`;
const TitleBox = styled.div`
    width: 415px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const ButtonContainer = styled.div`
    position: absolute;
    bottom: 40px;
    right: 100px;
`;