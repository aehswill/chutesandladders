import React, { useEffect } from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import ToggleComponent from './ToggleComponent'
import DifficultyComponent from './DifficultyComponent'
import PlayerBoxComponent from './PlayerBoxComponent'
import ColorSelectorComponent from './ColorSelectorComponent'
import {selectIsHost, selectLobbyNickname,
    selectLobbyID, selectUser, selectUserID} from '../start/gamesetupSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "../../common/Modal"
import { openModal } from '../../common/modalSlice'
import axios from 'axios'
import Player from '../../model/Player'
import PlayerEntryComponent from './PlayerEntryComponent'
import StartButton from '../../common/StartButton'


// get lobby info here
export default function LobbyPage(props){
    const [players, setPlayers] = useState([]);
    const [color, setColor] = useState("");
    const dispatch = useDispatch();
    const getLobbyName = useSelector(selectLobbyNickname);
    const getLobbyID = useSelector(selectLobbyID);
    const getIsHost = useSelector(selectIsHost);
    const getUser = useSelector(selectUser);
    const getUserID = useSelector(selectUserID);
    
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
                    temp.push(new Player("", n, true, false))
                })
                
                setPlayers(temp);
            })
            .catch(function(error){
                console.log(error)
            });
    }},[]);

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
                    <PlayerBoxComponent players={players}/>
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