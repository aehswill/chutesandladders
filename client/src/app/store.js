import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../common/modalSlice'
import gamesetupReducer from '../pages/start/gamesetupSlice'
import lobbysetupReducer from '../pages/lobby/lobbysetupSlice';
import dieReducer from '../pages/game/dieSlice';
import playReducer from '../pages/game/playSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    gamesetup: gamesetupReducer,
    lobbysetup: lobbysetupReducer,
    die: dieReducer,
    play: playReducer,
  },
});
