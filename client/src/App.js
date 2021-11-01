import React from "react"
import axios from "axios"
import './css/App.css';
import LobbyTable from "./components/LobbyTable";
import HostGameGroup from "./components/HostGameGroup";
import JoinSpecifc from "./components/JoinSpecificGroup";

function clickMe() {
  const res =  axios.get('azure-backend://azure-backend:5000/', {
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
