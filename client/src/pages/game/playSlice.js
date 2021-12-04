// messages from gamestate
// turn from gamestate
// active player ID from gamestate
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    messages: [],
    turn: 0,
    active_player: "empty",
    trivia_questions: [],
    trivia_token: "empty",
    trivia_result: false,
}

export const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
            // update backend
        },
        setTurn: (state, action) => {
            state.turn = action.payload;
            // update backend
        },
        setActivePlayer: (state, action) => {
            state.active_player = action.payload;
            // update backend
        },
        setTriviaQuestions: (state, action) => {
            console.log(action.payload);
            state.trivia_questions = action.payload;
            console.log(state.trivia_questions);
        },
        setTriviaResult: (state, action) => {
            state.trivia_result = action.payload;
        }
    }
});

export const selectMessages = (state) => state.play.messages;
export const selectTurn = (state) => state.play.turn;
export const selectActivePlayer = (state) => state.play.active_player;
export const selectTriviaQuestions = (state) => state.play.trivia_questions;
export const selectTriviaResult = (state) => state.play.trivia_result;

export const { addMessage, setTurn, setActivePlayer, setTriviaQuestions, setTriviaResult } = playSlice.actions;

export default playSlice.reducer;