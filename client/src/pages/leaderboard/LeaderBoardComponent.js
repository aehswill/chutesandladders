import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function LeaderBoardComponent(props){
    // can I use the same list for each stripe and just sort it differently?
    return(
        <Container>
            <OverallTop>Overall</OverallTop>
            <TriviaTop>Trivia</TriviaTop>
            <SpeedTop>Speed</SpeedTop>
            <Overall>

            </Overall>

            
            <Trivia>

            </Trivia>

            
            <Speed>

            </Speed>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 730px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0px;
    font-family: Poppins;
    font-size: 24px;
    color: white;
`;
const OverallTop = styled.div`
    text-alignment: center;
    width: 240px;
    height: 70px;
    background: #00B800;
    border: 1px solid black;
    border-radius: 12px 0px 0px 0px;
`;
const Overall = styled.ul`
    padding-left: 0;
    list-style-type: none;
    margin-top: 0px;
    width: 240px;
    height: 622px;
    background: #00B800;
    border: 1px solid black;
    border-radius: 0px 0px 0px 12px;
`;
const TriviaTop = styled.div`
    width: 240px;
    height: 70px;
    background: #006B00;
    border: 1px solid black;
    border-radius: 0px 0px 0px 0px;
`;
const Trivia = styled.ul`
    padding-left: 0;
    list-style-type: none;
    margin-top: 0px;
    width: 240px;
    height: 622px;
    background: #006B00;
    border: 1px solid black;
    border-radius: 0px;
`;
const SpeedTop = styled.div`
    width: 240px;
    height: 70px;
    background: #1A8711;
    border: 1px solid black;
    border-radius: 0px 12px 0px 0px;
`;
const Speed = styled.ul`
    padding-left: 0;
    list-style-type: none;
    margin-top: 0px;
    width: 240px;
    height: 622px;
    background: #1A8711;
    border: 1px solid black;
    border-radius: 0px 0px 12px 0px;
`;