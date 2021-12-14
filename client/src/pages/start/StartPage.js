// I'm the start page component, I house all of the other components you see on the start page.
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import HostComponent from './HostComponent'
import JoinComponent from './JoinComponent'
import LobbyTableComponent from './LobbyTableComponent'
import { openModal } from '../../common/modalSlice'
import Modal from '../../common/Modal'
import EnterNameComponent from './EnterNameComponent'


/**
 * [req 3.7.1] Start Page top-level component
 * 
 * @param {*} props 
 * @returns JSX for the start page components
 */

export default function StartPage(props){
  const dispatch = useDispatch();

  // req 3.7.1.3.1.5: Open Enter Nickname window
  const click = () => {
    dispatch(openModal());
  }

  return(
      <>
        <Modal content={EnterNameComponent}/>
        <Start>
            <MainTitle>
                <MainTitleText>Puzzling Pipes</MainTitleText>
            </MainTitle>

            <HostComponent onClick={click}/>

            <DevTestContainer>
            </DevTestContainer>

            <JoinComponent onClick={click}/>

            <JoinExistingContainer>
                <h1>Join an Open Game</h1>
                <LobbyTableComponent onClick={click}/>

            </JoinExistingContainer>


        </Start>
      </>
  );
}


// STYLE
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
margin-top: 20px;
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
const JoinExistingContainer = styled.div`
  grid-area: existing;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
`;
const DevTestContainer = styled.div`
  grid-area: devtest;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
`;