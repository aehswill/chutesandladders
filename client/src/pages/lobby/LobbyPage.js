import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectIsHost, selectLobbyNickname,
    selectLobbyID, selectUserID} from '../start/gamesetupSlice'
import { openModal } from '../../common/modalSlice'
import { selectPlayers, setPlayers } from './lobbysetupSlice'
import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken } from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'
import styled from 'styled-components'
import ToggleComponent from './ToggleComponent'
import DifficultyComponent from './DifficultyComponent'
import PlayerBoxComponent from './PlayerBoxComponent'
import ColorSelectorComponent from './ColorSelectorComponent'
import Modal from "../../common/Modal"
import StartButton from '../../common/StartButton'
import axios from 'axios'

/**
 * [req 3.2, 3.7.2] Lobby page
 * 
 * @param {*} props 
 * @returns 
 */
export default function LobbyPage(props){
    const [navigated, setNavigated] = useState(false);
    const dispatch = useDispatch();
    const getLobbyName = useSelector(selectLobbyNickname);
    const getLobbyID = useSelector(selectLobbyID);
    const getIsHost = useSelector(selectIsHost);
    const getUserID = useSelector(selectUserID);
    const getPlayers = useSelector(selectPlayers);
    const blueTaken = useSelector(selectIsBlueTaken);
    const orangeTaken = useSelector(selectIsOrangeTaken);
    const purpleTaken = useSelector(selectIsPurpleTaken);
    const yellowTaken = useSelector(selectIsYellowTaken);
    
    const click = () => {
        
        dispatch(openModal());
    }
    
    const colorHandler = (color) => {
        if(
            (color === blue && blueTaken) ||
            (color === purple && purpleTaken) ||
            (color === yellow && yellowTaken) ||
            (color === orange && orangeTaken)
            ) return;
        else {
            dispatch(setPlayers(getPlayers.map( (player) => {
            if(player.player_uid === getUserID){
                const oldColor = player.color; 
                // deselect previous color
                switch(oldColor){
                    case yellow:
                        dispatch(setIsYellowTaken(false));
                        break;
                    case orange:
                        dispatch(setIsOrangeTaken(false));
                        break;
                    case purple:
                        dispatch(setIsPurpleTaken(false));
                        break;
                    case blue:
                        dispatch(setIsBlueTaken(false));
                        break;
                    default:
                        break;
                }
                player.color = color;
            }
            return player;
        })))
        axios.put(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${getLobbyID}/players/`, getPlayers, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
            })
            .catch(function(error){
                console.log(error)
            })
    }
    }

    return(
        <>
        <Modal content={DifficultyComponent} />
        <Outer>
            <Container>
                <ToggleComponent isDisabled={!getIsHost}/>
                <div>
                    <TitleBox>
                        <h1>{getLobbyName}</h1>
                        <h1>{getLobbyID}</h1>
                    </TitleBox>
                    <PlayerBoxComponent players={getPlayers} navigated={navigated}/>
                </div>
                <ColorSelectorComponent click={colorHandler}/>
            </Container>
            <ButtonContainer>
                <StartButton text="GO" click={click} isDisabled={!getIsHost}/>
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