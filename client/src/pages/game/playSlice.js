// messages from gamestate
// turn from gamestate
// active player ID from gamestate
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    turn: 0,
    active_player: ""
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
        }
    }
});

export const selectMessages = (state) => state.play.messages;
export const selectTurn = (state) => state.play.turn;
export const selectActivePlayer = (state) => state.play.active_player;

export const { addMessage, setTurn, setActivePlayer } = playSlice.actions;

export default playSlice.reducer;