import React from 'react'
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

// get lobby info here
export default function LobbyPage(props){
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
        // auto-assign colors to players who haven't chosen
        dispatch(setPlayers(getPlayers.map( (player) => {
            if(player.color === "transparent"){
                if(!blueTaken){
                    dispatch(setIsBlueTaken(true));
                    player.color = blue;
                }
                else if(!orangeTaken){
                    dispatch(setIsOrangeTaken(true));
                    player.color = orange;
                }
                else if(!yellowTaken){
                    dispatch(setIsYellowTaken(true));
                    player.color = yellow;
                } 
                else if(!purpleTaken){
                    dispatch(setIsPurpleTaken(true));
                    player.color = purple;
                } 
            }
            axios.put(`http://localhost:5000/api/v1/lobbies/${getLobbyID}/players/${player.player_uid}`, player)
            .catch(function(error){
                console.log(error)
            })
            return player;
        })))
        const anyBots = getPlayers.map(player=>player.isRobot?"true":"false");
        if(anyBots) dispatch(openModal());
        else{
            // there are no bots to assign difficulty to, navigate directly to next page
        }
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
                const res = axios.put(`http://localhost:5000/api/v1/lobbies/${getLobbyID}/players/${player.player_uid}`, player)
                .catch(function(error){
                    console.log(error)
                })
                res.then(console.log(res))
            }
            return player;
        })))}
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
                    <PlayerBoxComponent players={getPlayers}/>
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