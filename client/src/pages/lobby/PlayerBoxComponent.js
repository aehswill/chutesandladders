import React from 'react'
import styled from 'styled-components'
import PlayerEntryComponent from './PlayerEntryComponent';


export default function PlayerBoxComponent(props){
    
    return(
        <Box>
            Players
            <Separator />
            <List>
            {(props.players).map(player=>(
                <PlayerEntryComponent player={player}/>
            ))}
            </List>
        </Box>
    );
}

// STYLE
const Box = styled.div`
    margin: 20px 0px;
    background: linear-gradient(180deg, rgba(0,0,0,0.125) 0%, rgba(255,255,255,0.25) 100%), #00B800;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(0,0,0,0.35);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 42px 23px;
    width: 415px;
    height: 420px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 35px;
    color: white;
`;
const List = styled.ul`
    width: 350px;
    height: 280px;
    padding: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-contents: space-evenly;
`;
const Separator = styled.div`
    background-color: white;
    height: 2px;
    width: 350px;
    margin: 10px 0px;
`; 