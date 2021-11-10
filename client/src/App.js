import * as React from "react"
import axios from "axios"
import './css/App.css';
import LobbyTable from "./components/LobbyTable";
import HostGameGroup from "./components/HostGameGroup";
import JoinSpecifc from "./components/JoinSpecificGroup";

function clickMe() {
  //chagne to localhost:5000 for testing
  //change to https://puzzlingpipes-api.azurewebsites.net/
  const res =  axios.post('http://localhost:5000/lobbies', {
    name: 'lobby',
    id: 'idNo',
    players: {
        player1: {
          player_uid: '1',
          nickname: 'Kevin',
          ip: '123.45.67',
          isRobot: false,
          total_points: 0,
          speed_points: 0,
          trivia_points: 0,
        },
        player2: {
          player_uid: '2',
          nickname: 'Tara',
          ip: '123.45.67',
          isRobot: false,
          total_points: 0,
          speed_points: 0,
          trivia_points: 0,
        },
        player3: {
          player_uid: '3',
          nickname: 'Nethra',
          ip: '123.45.67',
          isRobot: false,
          total_points: 0,
          speed_points: 0,
          trivia_points: 0,
        },
        player4: {
          player_uid: '4',
          nickname: 'Robert',
          ip: '123.45.67',
          isRobot: true,
          total_points: 0,
          speed_points: 0,
          trivia_points: 0,
        },
    },
    gamestate: {
      active_trivia_question: 'trivia q',
      player_trivia_answer: 'trivia a',
      active_player: {
          player_uid: '1',
          nickname: 'kevin',
          ip: '123.45.67', 
          isRobot: false,
          total_points: 0,
          speed_points: 0,
          trivia_points: 0,
      }
    }
  });


  
  res.then(function(response){
    console.log(response.data);
    alert('Backend API says: '+response.data);
    
  })
  .catch(function(error){
    console.log(error);
  })
};
//TODO: implement flexbox in main layout instead of grid
function App() {
  return (
    <div className="App">
      <div className="main-title">
        <header className="main-title-text">Puzzling Pipes</header>
      </div>
      <HostGameGroup/>
      <div className="dev-test">
        <button onClick={clickMe}>API TEST</button>
      </div>
      <JoinSpecifc />
      <div className="join-existing">
        <h1>Join an Open Game</h1>
        <LobbyTable></LobbyTable>
      </div>
    </div>
  );
}

export default App;
