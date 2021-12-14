import React from "react";
import styled from "styled-components";
import LeaderBoardComponent from "./LeaderBoardComponent";


// useEffect, pull leaderboard from the API once on load
// also pull players from lobby

/**
 * [req 3.5, 3.7.4] Leaderboard page
 * 
 * @param {*} props 
 * @returns 
 */
export default function LeaderboardPage(props){
    const winner = "Tara";
    const trivia = "Kevin";
    const speed = "Nethra";


    return(
        <OuterContainer>
            <FlexContainer>
                <LeaderBoardComponent/>
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
        </OuterContainer>
    );
}



// STYLE
const OuterContainer=styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`;
const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center
    align-items: center;
    gap: 100px;
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