// messages from gamestate
// turn from gamestate
// active player ID from gamestate
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    trivia_result: {player_uid: "", isCorrect: false}
}

export const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        setTriviaResult: (state, action) => {
            state.trivia_result = action.payload;
        }
    }
});

export const selectTriviaResult = (state) => state.play.trivia_result;

export const {setTriviaResult} = playSlice.actions;

export default playSlice.reducer;