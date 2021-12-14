import React from 'react'
import styled from 'styled-components'

// part of [req 3.7.3.1] Show each player in the lobby with active indicator
export default function PlayerComponent(props){
    const color = props.player.color;
    const name = props.player.nickname;
    const isActive = props.isActive;

    return(
        <ListItem>
            <ChosenColor color={color}/>
            <Name isActive={isActive}>{name}</Name>
        </ListItem>
    )
}        

// STYLE
const ListItem = styled.li`
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
`;
const ChosenColor = styled.span`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${props=>props.color};
`;
const Name = styled.span`
    font-size: 24px;
    color: ${props=>props.isActive?"#12FF12":"white"};
    font-family: Roboto;
    font-weight: 500;
`;