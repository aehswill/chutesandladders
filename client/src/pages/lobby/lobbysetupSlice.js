import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const orange = "#FC7438";
export const purple = "#B117EB";
export const blue = "#005BF5";
export const yellow = "#FFE424";

const initialState = {
    isPublicGame: true, 
    difficulty: 'easy',
    myColor: 'empty',
    isYellowTaken: false, 
    isPurpleTaken: false, 
    isOrangeTaken: false,
    isBlueTaken: false,
    players: [],
    hasStarted: false
}

export const lobbysetupSlice = createSlice({
    name: 'lobbysetup',
    initialState,
    reducers: {
        setIsPublicGame: (state, action) => {
            state.isPublicGame = action.payload;
            const url = window.location.href;
            const id = url.split("/")[4];
            axios.put(`http://localhost:5000/api/v1/lobbies/${id}`, {
                isPublic: action.payload,
            });
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload
            const url = window.location.href;
            const id = url.split("/")[4];
            axios.put(`http://localhost:5000/api/v1/lobbies/${id}`, {
                difficulty: `${action.payload}`,
            });
        },
        setMyColor: (state, action) => {
            state.myColor = action.payload;
        },
        setIsYellowTaken: (state, action) => {
            state.isYellowTaken = action.payload
        },
        setIsPurpleTaken: (state, action) => {
            state.isPurpleTaken = action.payload
        },
        setIsOrangeTaken: (state, action) => {
            state.isOrangeTaken = action.payload
        },
        setIsBlueTaken: (state, action) => {
            state.isBlueTaken = action.payload
        },
        setPlayers: (state, action) => {
            const tempArray = (action.payload).map(player=>JSON.stringify(player));
            state.players = tempArray;
        },
        setHasStarted: (state, action) => {
            state.hasStarted = action.payload;
        }

    }
});

export const selectIsPublicGame = (state) => state.lobbysetup.isPublicGame;
export const selectDifficulty = (state) => state.lobbysetup.difficulty;
export const selectMyColor = (state) => state.lobbysetup.myColor;
export const selectIsYellowTaken = (state) => state.lobbysetup.isYellowTaken;
export const selectIsPurpleTaken = (state) => state.lobbysetup.isPurpleTaken;
export const selectIsOrangeTaken = (state) => state.lobbysetup.isOrangeTaken;
export const selectIsBlueTaken = (state) => state.lobbysetup.isBlueTaken;
export const selectPlayers = (state) => (state.lobbysetup.players).map(player=>JSON.parse(player));
export const selectHasStarted = (state) => state.lobbysetup.hasStarted;

export const { 
    setIsPublicGame,
    setDifficulty,
    setMyColor, 
    setIsYellowTaken, 
    setIsPurpleTaken, 
    setIsOrangeTaken, 
    setIsBlueTaken,
    setPlayers,
    setHasStarted
 } = lobbysetupSlice.actions;


export default lobbysetupSlice.reducer;