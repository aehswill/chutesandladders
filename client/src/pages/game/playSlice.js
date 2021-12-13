// messages from gamestate
// turn from gamestate
// active player ID from gamestate
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [{}],
    trivia_result: {player_uid: "", isCorrect: false},
    trivia_done: false,
}

export const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        setTriviaResult: (state, action) => {
            state.trivia_result = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setTriviaDone: (state, action) =>{
            state.trivia_done = action.payload;
        }
    }
});

export const selectTriviaResult = (state) => state.play.trivia_result;
//export const selectMessages = (state) => state.play.messages;
export const selectTriviaDone = (state) => state.play.trivia_done;

export const {setTriviaResult, setTriviaDone} = playSlice.actions;

export default playSlice.reducer;