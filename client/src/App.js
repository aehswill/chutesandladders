import * as React from "react"
import axios from "axios"
import './css/App.css';
import LobbyTable from "./components/LobbyTable";
import HostGameGroup from "./components/HostGameGroup";
import JoinSpecifc from "./components/JoinSpecificGroup";

function clickMe() {
  //chagne to localhost:5000 for testing
  //change to https://puzzlingpipes-api.azurewebsites.net/
  const res =  axios.get('https://puzzlingpipes-api.azurewebsites.net/', {
    
  });
  res.then(function(response){
    console.log(response.data);
    alert('Backend API says: '+response.data.message);
    
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
