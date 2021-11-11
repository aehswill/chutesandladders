import React from 'react'
//import {Link} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import HostComponent from './HostComponent'
import JoinComponent from './JoinComponent'
import LobbyTableComponent from './LobbyTableComponent'

function APITest() {
    const res =  axios.get('https://puzzlingpipes-api.azurewebsites.net/', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
    });
    res.then(function(response){
      alert('Backend API says: '+response.data.message);
      console.log(response.data.message);
    })
    .catch(function(error){
      console.log(error);
    })
  };

export default function StartPage(props){
    return(
        <Start>
            <MainTitle>
                <MainTitleText>Puzzling Pipes</MainTitleText>
            </MainTitle>
            <HostComponent />
            <div className="dev-test">
                <button onClick={APITest}>API TEST</button>
            </div>
            <JoinComponent />
            <div className="join-existing">
                <h1>Join an Open Game</h1>
                <LobbyTableComponent />
            </div>
        </Start>
    );
}

const Start = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(3, 1fr 50px);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    ". . . title . . ."
    ". host . devtest . specific ."
    ". . existing existing existing . ."
    ". . existing existing existing . .";
`;
const MainTitle = styled.div`
grid-area: title;
align-self: center;
justify-self: center;
background: #00B800;
width: 400px;
height: 164px;
box-shadow: 15px 10px 20px #131212;
border-radius: 5px;
margin-top: 30px;
`;
const MainTitleText = styled.header`
padding-top: 30px;
text-align: center;
font-family: Coiny;
font-style: normal;
font-weight: normal;
font-size: 50px;
line-height: 58px;
letter-spacing: 0.03em;
text-transform: uppercase;
color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0,0,0,0.25), 0px 4px 4px rgba(0,0,0,0.25)
`;