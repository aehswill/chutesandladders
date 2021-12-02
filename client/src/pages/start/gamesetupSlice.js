import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    isHost: false, 
    lobbyNickname: 'empty', 
    lobbyID: 'empty', 
    user: 'empty', 
    userID: 'empty',
    lobbies: []
}

export const gamesetupSlice = createSlice({
    name: 'gamesetup',
    initialState,
    reducers: {
        setIsHost: (state, action) => {
            state.isHost = action.payload
        },
        setLobbyNickname: (state, action) => {
            state.lobbyNickname = action.payload
        },
        setLobbyID: (state, action) => {
            state.lobbyID = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserID: (state, action) => {
            state.userID = action.payload
        },
        setLobbies: (state, action) => {
            state.lobbies = (action.payload).map(lobby=>JSON.stringify(lobby));
        }
    }
});

export const selectIsHost = (state) => state.gamesetup.isHost;
export const selectLobbyID = (state) => state.gamesetup.lobbyID;
export const selectLobbyNickname = (state) => state.gamesetup.lobbyNickname;
export const selectUser = (state) => state.gamesetup.user;
export const selectUserID = (state) => state.gamesetup.userID;
export const selectLobbies = (state) => (state.gamesetup.lobbies).map(lobby=>JSON.parse(lobby));


export const { 
    setIsHost, 
    setLobbyID, 
    setLobbyNickname, 
    setUser, 
    setUserID,
    setLobbies } = gamesetupSlice.actions;

export default gamesetupSlice.reducer;