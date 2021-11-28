import React from 'react'
import styled from 'styled-components'
import Bot from '../../assets/Bot.png'

export default function PlayerEntryComponent(props){
    const color = props.player.color;
    const name = props.player.nickname;
    const host = props.player.isHost;
    const bot = props.player.isRobot;

    return(
        <ListItem>
            <ChosenColor color={color}/>
            <span>{name}</span>
            {host && <GM>gamemaster</GM>}
            {bot && <Icon src={Bot} alt="Robot Icon"/>}
        </ListItem>
    )
}

// STYLE
const ListItem = styled.li`
    height: 60px;
    width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 10px;
    align-items: center;
    font-size: 24px;
    color: white;
    font-family: Roboto;
    font-weight: 500;
    font-size: 24px;
`;
const ChosenColor = styled.span`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${props=>props.color};
`;
const GM = styled.div`
    margin-left: auto;
`;
const Icon = styled.img`
    margin-left: auto;
`;