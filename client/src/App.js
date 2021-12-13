import React from 'react';
import './App.css';
import {useRoutes} from 'hookrouter'
import StartPage from './pages/start/StartPage'
import LobbyPage from './pages/lobby/LobbyPage'
import GamePage from './pages/game/GamePage'
import LeaderboardPage from './pages/leaderboard/LeaderboardPage'

const routes = {
  "/":()=><StartPage />,
  "/lobby/:id":()=><LobbyPage />,
  "/lobby/:id/game":()=><GamePage/>,
  "/lobby/:id/leaderboard":()=><LeaderboardPage/>
};

function App() {
    const routeResult = useRoutes(routes)
    return routeResult
}

export default App;
