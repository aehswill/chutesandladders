import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectIsHost, selectLobbyNickname,
    selectLobbyID, selectUser, selectUserID} from '../start/gamesetupSlice'
import { openModal } from '../../common/modalSlice'
import { selectPlayers, setPlayers } from './lobbysetupSlice'
import { customAlphabet } from 'nanoid'
import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { setMyColor, setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken} from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'
import styled from 'styled-components'
import ToggleComponent from './ToggleComponent'
import DifficultyComponent from './DifficultyComponent'
import PlayerBoxComponent from './PlayerBoxComponent'
import ColorSelectorComponent from './ColorSelectorComponent'
import Modal from "../../common/Modal"
import axios from 'axios'
import Player from '../../model/Player'
import StartButton from '../../common/StartButton'

const nanoid = customAlphabet("ABCDEF0123456789", 36);

export default function LobbyPage(props){
    const dispatch = useDispatch();
    const getLobbyName = useSelector(selectLobbyNickname);
    const getLobbyID = useSelector(selectLobbyID);
    const getIsHost = useSelector(selectIsHost);
    const getUser = useSelector(selectUser);
    const getUserID = useSelector(selectUserID);
    const getPlayers = useSelector(selectPlayers);
    const blueTaken = useSelector(selectIsBlueTaken);
    const orangeTaken = useSelector(selectIsOrangeTaken);
    const purpleTaken = useSelector(selectIsPurpleTaken);
    const yellowTaken = useSelector(selectIsYellowTaken);

    // poll for updated players list, check specifically for color changes
    // check players color and update corresponding IsTaken action in redux
    
    useEffect(()=>{
        const temp = [];
        const shortList = [];
        const user = getUser;
        const id = getUserID;
        const host = getIsHost;
        temp.push(new Player(`${id}`, `${user}`, false, host));
        if(host === true){
            const res = axios.get('https://api.fungenerators.com/name/generate?category=alien');
            res.then(function(response){
                var count = 1;
                (response.data.contents.names).forEach(name =>{
                    if(name.length < 10 && count < 4){ // we only need 3 robot names
                        shortList.push(name);
                        ++count;
                    }
                })
                shortList.forEach(n=>{
                    temp.push(new Player(nanoid(), n, true, false))
                })

                dispatch(setPlayers(temp)); // player list sent to backend when redux is updated (lobbysetupSlice)
                console.log(getPlayers);
            })
            .catch(function(error){
                console.log(error)
            });
    }},[]);

    const click = () => {
        // auto-assign colors to players who haven't chosen
        dispatch(setPlayers(getPlayers.map( (player) => {
            if(player.color === "transparent"){
                if(!blueTaken) player.color = blue;
                else if(!orangeTaken) player.color = orange;
                else if(!yellowTaken) player.color = yellow;
                else if(!purpleTaken) player.color = purple;
            }
            return player;
        })))
        // redux will update backend, then on our next poll the UI should pick up the changes
        const anyBots = getPlayers.map(player=>player.isRobot?"true":"false");
        if(anyBots) dispatch(openModal());
        else{
            // there are no bots to assign difficulty to, navigate directly to next page
        }
      }
    
    const colorHandler = (color) => {
        dispatch(setPlayers(getPlayers.map( (player) => {
            if(player.player_uuid === getUserID){
                player.color = color;
            }
            return player;
        })))
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
                    <PlayerBoxComponent players={getPlayers}/>
                </div>
                <ColorSelectorComponent click={colorHandler}/>
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