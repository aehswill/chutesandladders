import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modalReducer from '../common/modalSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
  },
});
