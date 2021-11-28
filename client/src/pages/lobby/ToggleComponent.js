import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPublicGame, selectIsPublicGame } from './lobbysetupSlice';
import axios from 'axios';

export default function ToggleComponent(props){
    const dispatch = useDispatch();
    const getIsPublicGame = useSelector(selectIsPublicGame);
    const [isPublic, setIsPublic] = useState();

    const url = window.location.href;
    const getLobbyID = url.substring(url.lastIndexOf('/') + 1);
    axios.get(`http://localhost:5000/api/v1/lobbies/${getLobbyID}`)
        .then((lobby) => {
            setIsPublic(lobby.data.isPublic);
        })
        .catch(function(error){
            console.log({
                message: error.message
            })
        })


    function onPublicClick(){
        setIsPublic(true);
        dispatch(setIsPublicGame(true));

    }
    function onPrivateClick(){
        setIsPublic(false);
        dispatch(setIsPublicGame(false));
    }

    return(
        <OuterContainer>
            <Container>
                <Public public={isPublic} onClick={onPublicClick}>Public</Public>
                <Private public={isPublic} onClick={onPrivateClick}>Private</Private>
            </Container>
        </OuterContainer>
    );
}

//STYLE
const OuterContainer = styled.div`
    width: 280px;
    display: flex;
    flex-direction: row-reverse;
`;
const Container = styled.div`
    margin: 70px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: Poppins;
    font-size: 28px;
    width: 160px;
    height: 100px;
    border-radius: 20px;
    background-color: white;
    padding: 4px;
`;
const Public = styled.span`
    padding: 2px 0px;
    cursor: pointer;
    text-align: center;
    width: 160px;
    height: 50px;
    border-radius: 20px;
    background-color: ${props=>props.public?"#00B800":"white"};
    color: ${props=>props.public?"white":"#00B800"};
    -webkit-transition: .4s;
    transition: .4s;
`;
const Private = styled.span`
    padding: 2px 0px;
    cursor: pointer;
    text-align: center;
    width: 160px;
    height: 50px;
    border-radius: 20px;
    background-color: ${props=>props.public?"white":"#00B800"};
    color: ${props=>props.public?"#00B800":"white"};
    -webkit-transition: .4s;
    transition: .4s;
`;