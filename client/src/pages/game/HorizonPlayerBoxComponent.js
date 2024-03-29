import React from 'react'
import styled from 'styled-components'
import PlayerComponent from './PlayerComponent';

/**
 * [req 3.7.3.1] Show each player in the lobby
 * 
 * @param {*} props 
 * @returns 
 */
export default function HorizonPlayerBoxComponent(props){
    const players = (typeof props.players === 'undefined')?[{}]:props.players;
    return(
        <>
            <Box>
                <List>
                {(players).map(player=>(
                    <PlayerComponent player={player.player} isActive={player.isTurn}/>

                ))}
                </List>
            </Box>
        </>
    )
}

//STYLE
const Box = styled.div`
    display: flex;
    justify-contents: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #2E9BFF;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(255,255,255,0.35);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 27px 24px;
    height: 83px;
`;
const List = styled.ul`
    height: 83px;
    padding: 0px;
    margin: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-contents: space-evenly;
    align-items: center;
    gap: 25px;
`;