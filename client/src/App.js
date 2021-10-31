import React from "react"
import axios from "axios"
import './css/App.css';
import TextBox from './components/TextBox'
import StartButton from './components/StartButton'
import LobbyTable from "./components/LobbyTable";


const api = axios.create({
  baseURL: 'http://localhost:5000'
})

function clickMe() {
  api.get('/')
  .then(function(response){
    alert(response.data.message);
    console.log(response.data.message);
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
      <div className="host-game">
        <h1>Host a New Game</h1>
        <TextBox placeholder="Lobby Nickname"/>
        <StartButton text="START"/>
      </div>
      <div className="dev-test">
      </div>
      <div className="join-specific">
        <h1>Join a Game</h1>
        <TextBox placeholder="Lobby ID"/>
        <StartButton text="JOIN"/>
      </div>
      <div className="join-existing">
        <h1>Join an Open Game</h1>
        <LobbyTable></LobbyTable>
      </div>
    </div>
  );
}

export default App;
