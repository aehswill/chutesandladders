import React from 'react';
import './App.css';
import {useRoutes} from 'hookrouter'
import StartPage from './pages/start/StartPage'
import LobbyPage from './pages/lobby/LobbyPage'
import GamePage from './pages/game/GamePage';

const routes = {
  "/":()=><StartPage />,
  "/lobby":()=><LobbyPage />,
  "/game":()=><GamePage/>
};

function App() {
    const routeResult = useRoutes(routes)
    return routeResult
}

export default App;
