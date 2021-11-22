import React from 'react'
import styled from 'styled-components'

export default function PlayerEntryComponent(props){
    // also pass in user ID
    // listen for updates... check that this color = userID's color from request
    if(props.host === true){
        return(
            <ListItem>
                <ChosenColor color={props.color}/>
                <span>{props.name}</span>
                <GM>gamemaster</GM>
            </ListItem>
        )
    }
    else{
        return(
            <ListItem>
                <ChosenColor color={props.color}/>
                <span>{props.name}</span>
            </ListItem>
        )
    }
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
    background-color: yellow;
`;
const GM = styled.span`
    flex-grow: 2;
`;