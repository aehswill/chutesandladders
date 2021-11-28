// I'm the main page component, I house all of the other components you see on the main page.
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter';
import axios from 'axios'
import styled from 'styled-components'
import HostComponent from './HostComponent'
import JoinComponent from './JoinComponent'
import LobbyTableComponent from './LobbyTableComponent'
import { openModal } from '../../common/modalSlice'
import Modal from '../../common/Modal'
import EnterNameComponent from './EnterNameComponent'
import { selectIsHost, selectLobbyID, selectLobbyNickname, selectUser, selectUserID } from './gamesetupSlice'

import Cookies from 'universal-cookie';



function APITest() {
    const id = '000002';

    // get lobby request
    const res =  axios.get(`http://localhost:5000/api/v1/lobbies/${id}`, {
       
    });

    res.then(function(response){
      alert('Backend API says: '+response.data);
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    })
};

export default function StartPage(props){
  const dispatch = useDispatch();
  const getisHost = useSelector(selectIsHost);
  const getNickname = useSelector(selectLobbyNickname);
  const getLobby = useSelector(selectLobbyID);
  const getUser = useSelector(selectUser);
  const getUserID = useSelector(selectUserID);

  console.log(getisHost);
  console.log(getNickname);
  console.log(getLobby);
  console.log(getUser);
  console.log(getUserID);
 
  const cookies = new Cookies();
  if(getUser !== 'empty' && getUserID !== 'empty'){
    if(getisHost === true){
        console.log('Create New Lobby');
        const req = axios.post('http://localhost:5000/api/v1/player', {
            player_uid: getUserID,
            nickname: getUser,
            isRobot: false,
            isHost: true,
            total_points: 0,
            speed_points: 0,
            trivia_points: 0, 
        });
        req.then((res) => {
            cookies.set('playerID', res.data.id, {path: '/'});
            console.log(cookies.get('myCat')); // Pacman
            axios.post(`http://localhost:5000/api/v1/lobbies/`, {
                name: getNickname,
                id: getLobby,
                isPublic: true,
                players: [
                    {
                        player_uid: res.data.player_uid,
                        nickname: res.data.nickname,
                        isRobot: res.data.isRobot,
                        isHost: res.data.isHost,
                        total_points: res.data.total_points,
                        speed_points: res.data.speed_points,
                        trivia_points: res.data.trivia_points,
                    }, 
                    {
                        player_uid: '2',
                        nickname: 'Robert',
                        isRobot: true,
                        isHost: false,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    },
                    {
                        player_uid: '2',
                        nickname: 'Robert',
                        isRobot: true,
                        isHost: false,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    },
                    {
                        player_uid: '2',
                        nickname: 'Robert',
                        isRobot: true,
                        isHost: false,
                        total_points: 0,
                        speed_points: 0,
                        trivia_points: 0,
                    }
                ],
                gamestate: {
                    active_trivia_question: 'trivia q',
                    player_trivia_answer: 'trivia a',
                    active_player: {
                        player_uid: res.data.player_uid,
                        nickname: res.data.nickname,
                        isRobot: res.data.isRobot,
                        isHost: res.data.isHost,
                        total_points: res.data.total_points,
                        speed_points: res.data.speed_points,
                        trivia_points: res.data.trivia_points,
                    }
                }
            })
            .then(function(response){
                console.log(response.data);
                navigate('/lobby/'+getLobby);
            })
            .catch(function(error){
            console.log(error);
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }
    else if (getisHost === false){
        console.log(`Add player to lobby with ID: ${getLobby}`)
        const req = axios.post('http://localhost:5000/api/v1/player', {
            player_uid: getUserID,
            nickname: getUser,
            isRobot: false,
            isHost: false,
            total_points: 0,
            speed_points: 0,
            trivia_points: 0, 
        });
        req.then((res) => {
            console.log(res.data)


            axios.put(`http://localhost:5000/api/v1/lobbies/${getLobby}/players`, {
                        player_uid: res.data.player_uid,
                        nickname: res.data.nickname,
                        isRobot: res.data.isRobot,
                        isHost: res.data.isHost,
                        total_points: res.data.total_points,
                        speed_points: res.data.speed_points,
                        trivia_points: res.data.trivia_points,
                    })
                    .then(function(response){
                        console.log(response.data);
                        navigate("/lobby/"+getLobby );
                    })
                    .catch(function(error){
                    console.log(error);
                    })
        })
        .catch(function(error){
            console.log(error);
        });
    }
    else{
        /**
         * error or something here
         */
    }
  }

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
                <button onClick={APITest}>API TEST</button>
                <button onClick={()=>alert(getisHost)}>IsHost</button>
                <button onClick={()=>alert(getNickname)}>LobbyNickname</button>
                <button onClick={()=>alert(getLobby)}>LobbyID</button>
                <button onClick={()=>alert(getUser)}>User</button>
                <button onClick={()=>alert(getUserID)}>UserID</button>

                <button onClick={()=>navigate("/lobby/")}>LOBBY PAGE</button>




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