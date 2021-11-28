import React from 'react'
import styled from 'styled-components'

export default function PlayerComponent(props){
    const color = props.player.color;
    const name = props.player.nickname;
    const isTakingTurn = props.turn;

    return(
        <ListItem>
            <ChosenColor color={color}/>
            <span>{name}</span>
        </ListItem>
    )
}        

// STYLE
const ListItem = styled.li`
    height: 60px;
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