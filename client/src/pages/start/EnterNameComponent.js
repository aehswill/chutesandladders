import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox';
import PopupButton from '../../common/PopupButton';
import { useDispatch, useSelector } from 'react-redux'
import { selectIsHost, selectLobbyID, selectLobbyNickname, selectUser, selectUserID } from './gamesetupSlice'
import { setUser, setUserID } from './gamesetupSlice'
import { setPlayers, selectPlayers } from '../lobby/lobbysetupSlice';
import { navigate } from 'hookrouter';
import { customAlphabet } from 'nanoid';
import close from '../../assets/icons/close.png'
import axios from 'axios';
import Cookie from 'universal-cookie';
import Player from '../../model/Player';
import Lobby from '../../model/Lobby';
import GameState from '../../model/GameState';



const nanoid = customAlphabet("ABCDEF0123456789", 36);
const input = /^([A-Za-z0-9]{1,10})$/
const helpText = "Nickname must only contain the following characters: A-Z a-z 0-9"

export default function EnterNameComponent(props){
    const dispatch = useDispatch();
    const getIsHost = useSelector(selectIsHost);
    const getNickname = useSelector(selectLobbyNickname);
    const getLobby = useSelector(selectLobbyID);
    const getUser = useSelector(selectUser);
    const getUserID = useSelector(selectUserID);
    const getPlayers = useSelector(selectPlayers);
    const cookie = new Cookie();
    const [isInputValid, setIsInputValid] = React.useState(true);
    const [name, setName] = React.useState('');

    var textboxValue; 
    const playerArray = [];
    var self;
    async function onClick(){
        if(name !== ''){
            dispatch(setUser(name));
            // if the cookie hasn't been set, generate a new playerID
            var userID;
            if(typeof cookie.get('player_uid') === 'undefined'){
                userID = nanoid();
                cookie.set('player_uid', userID, [{path: '/'},{secure: true}, {sameSite: 'strict'}]);
                cookie.set('player_nickname', name, [{path: '/'},{secure: true}, {sameSite: 'strict'}]);
                cookie.set('isHost', getIsHost, [{path: '/'},{secure: true}, {sameSite: 'strict'}]);
            }
            else{
                userID = cookie.get('player_uid');
            }
            
            dispatch(setUserID(userID));
            const me = createUser(name, userID);
            if(getIsHost){ 
                createLobby();
            }
            else joinLobby(me);
            await sleep(3000);
            navigate('/lobby/'+getLobby);
            props.close();
        }
    }

    function createUser(name, id){
        self = new Player(`${id}`, `${name}`, false, `${getIsHost}`);
        playerArray.push(self);
        const req = axios.post('http://localhost:5000/api/v1/player', self);
        req.then((res) => {
            
        })
        .catch(function(error){
            console.log(error);
        });
        return self;
    }

    function createLobby(){
        const shortList = [];

        // get robot names
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
                playerArray.push(new Player(nanoid(), n, true, false))
            })
            dispatch(setPlayers(playerArray));

            const gamestate = new GameState(self);
            const lobby = new Lobby(getNickname, getLobby, playerArray, gamestate);
            console.log(gamestate);
            // we should remove the old lobby on the backend if player is host
            const req = axios.post(`http://localhost:5000/api/v1/lobbies/`, lobby);
            req.then(res=>console.log("Lobby created:"+JSON.stringify(res.data)))
            .catch(function(error){console.log("POST ERROR:"+error)});
        })
        .catch(function(error){
            console.log(error)
        });
    }

    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve, ms));
    }

    const joinLobby = (self) => {
        const req = axios.post(`http://localhost:5000/api/v1/lobbies/${getLobby}/players`, self);
        req.then(function(res){
            console.log(res.data)
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const handleChange = (evt)=>{
        if(input.test(evt.target.value)){
            setIsInputValid(true);
            setName(evt.target.value);
        }
        else{
            setIsInputValid(false);
        }
    }

    return(
            <OuterContainer>
                <ModalClose onClick={props.close}>
                    <img src={close} alt="close"/>
                </ModalClose>
                <InnerContainer>
                    <PopupTitle>Enter Nickname</PopupTitle>
                    <TextBox placeholder="Name" value={textboxValue} 
                    onChange={handleChange} bg="white" isValid={isInputValid} helpText={helpText}/>

                    <PopupButton text="START"click={onClick} isDisabled={!isInputValid}/>

                </InnerContainer>
            </OuterContainer>
    );
}

// STYLE
const OuterContainer =styled.div`
    position: absolute;
    top: 23%;
    width: 550px;
    height: 330px;
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
    top: 16.25%;
    bottom: 5.35%;
    padding-bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 3px solid;
    border-radius: 8px;
    border-image-source: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.5) 100%);
    background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.25) 100%), #881400;
`;
const PopupTitle = styled.h2`
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 25px;
    color: #FFFFFF;
    text-shadow: 0px 2px 4px rgba(91, 26, 26, 0.14), 0px 3px 4px rgba(123,12,12,0.12), 0px 1px 5px rgba(136,13,13,0.2);
`;
const ModalClose = styled.span`
    position: absolute;
    left: 8px;
    top: 8px;
    font-size: 24px;
    cursor: pointer;
`;