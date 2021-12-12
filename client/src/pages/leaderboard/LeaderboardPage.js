import React from "react";
import styled from "styled-components";
import BoardComponent from "../game/BoardComponent";


// useEffect, pull leaderboard from the API once on load
// also pull players from lobby

export default function LeaderboardPage(props){
    const winner = "Tara";
    const trivia = "Kevin";
    const speed = "Nethra";


    return(
        <FlexContainer>
            <BoardComponent/>
            <LocalScores>
                <ScoreBox>
                    <Title color="yellow">WINNER!</Title>
                    <Title color="white">{winner}</Title>
                </ScoreBox>
                <ScoreBox>
                    <Title color="yellow">Highest Trivia</Title>
                    <Title color="white">{trivia}</Title>
                </ScoreBox>
                <ScoreBox>
                    <Title color="yellow">Highest Trivia</Title>
                    <Title color="white">{speed}</Title>
                </ScoreBox>
            </LocalScores>
        </FlexContainer>
    );
}



// STYLE
const FlexContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center
    align-items: center;
    gap: 50px;
`;

const LocalScores = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const ScoreBox = styled.div`


`;

const Title = styled.h1`
    color: ${props=>props.color};
`;