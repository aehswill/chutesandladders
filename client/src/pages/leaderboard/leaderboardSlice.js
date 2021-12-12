import { createSlice } from '@reduxjs/toolkit'

export const orange = "#FC7438";
export const purple = "#B117EB";
export const blue = "#005BF5";
export const yellow = "#FFE424";

const initialState = {
    players: [],
    winner: "",
    high_speed: "",
    high_trivia: "",
}

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
        setHighSpeed: (state, action) => {
            state.high_speed = action.payload;
        },
        setHighTrivia: (state, action) => {
            state.high_trivia = action.payload
        },

    }
});

export const selectPlayers = (state) => state.leaderboard.players;
export const selectWinner = (state) => state.leaderboard.winner;
export const selectHighSpeed = (state) => state.leaderboard.high_speed;
export const selectHighTrivia = (state) => state.leaderboard.high_trivia;

export const { 
    setPlayers,
    setWinner,
    setHighSpeed,
    setHighTrivia,
 } = leaderboardSlice.actions;


export default leaderboardSlice.reducer;