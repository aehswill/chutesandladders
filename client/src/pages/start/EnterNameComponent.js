import React from 'react'
import styled from 'styled-components'
import TextBox from '../../common/TextBox';
import PopupButton from '../../common/PopupButton';
import { useDispatch, useSelector } from 'react-redux'
import { setUser, selectUser, selectIsHost, selectLobbyID, selectLobbyNickname } from './gamesetupSlice';
import { navigate } from 'hookrouter';
import axios from 'axios';


export default function EnterNameComponent(props){
    const dispatch = useDispatch();
    // var getUser = useSelector(selectUser);
    const getIsHost = useSelector(selectIsHost);
    const getIdToJoin = useSelector(selectLobbyID);
    const getLobbyNickname = useSelector(selectLobbyNickname);
    // go to next page first, send request from there with loading icon
    const onClick = () => {
        dispatch(setUser(textboxValue)); // does this need time to execute? returns "empty" here

        var getUser = selectUser;
        // API CALL -> async PUT request (ishost, lobby ID, lobby nickname, player name) 
        /**
         * if isHost is false Put the player in the lobby where id = lobbyID
         * 
         * else post new lobby where lobby name = lobby nickname
         */
        console.log(getUser);
        console.log(getIsHost);
        console.log(getIdToJoin);
        console.log(getLobbyNickname);
        if(getIsHost === true){
            axios.post('http://localhost:5000/api/v1/lobbies',{
                name: getLobbyNickname,
                id: '3d4a9a',
                players: [
                    {
                        player_uid: '1',
                        nickname: getUser,
                        ip: '123.45.67',
                        isRobot: false,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    }, 
                    {
                        player_uid: '2',
                        nickname: 'Robert',
                        ip: '123.45.67',
                        isRobot: true,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    },
                    {
                        player_uid: '3',
                        nickname: 'Robert',
                        ip: '123.45.67',
                        isRobot: true,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    },
                    {
                        player_uid: '4',
                        nickname: 'Robert',
                        ip: '123.45.67',
                        isRobot: true,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    }
                ],
                gamestate: {
                    active_trivia_question: 'trivia q',
                    player_trivia_answer: 'trivia a',
                    active_player: {
                        player_uid: '1',
                        nickname: 'kevin',
                        ip: '123.45.67', 
                        isRobot: false,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    }
                }
            })
        }
        else if (getIsHost === false){
            const res = axios.put(`http://localhost:5000/api/v1/lobbies/${getIdToJoin}/players`, {
                player_uid: '10',
                nickname: getUser,
                ip: '123.45.67',
                isRobot: false,
                total_points: 0,
                speed_points: 0,
                trivia_points: 0,
            });
        }
        else{
            /**
             * error or something here
             */
        }




        // Wait for request to return... handle bad responses, then...

        navigate("/lobby");
    }

    var textboxValue;
    const handleChange = (evt)=>{
        // HANDLE INPUT VALIDATION HERE!
        textboxValue = evt.target.value;
        console.log(textboxValue);
    }

    return(
            <OuterContainer>
                <ModalClose onClick={props.close}>&#10005;</ModalClose>
                <InnerContainer>
                    <PopupTitle>Enter Nickname</PopupTitle>
                    <TextBox placeholder="Name" value={textboxValue} onChange={handleChange} bg="white"/>
                    <PopupButton text="START"click={onClick}/>
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
top: 16.05%;
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
    right: 8px;
    top: 4px;
    font-size: 24px;
    cursor: pointer;
`;