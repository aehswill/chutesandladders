import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modalReducer from '../common/modalSlice'
import gamesetupReducer from '../pages/start/gamesetupSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    gamesetup: gamesetupReducer,
  },
});
