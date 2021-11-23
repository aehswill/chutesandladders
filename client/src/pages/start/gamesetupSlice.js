import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isHost: false, 
    lobbyNickname: 'empty', 
    lobbyID: 'empty', 
    user: 'empty', 
    userID: 'empty',
}

export const gamesetupSlice = createSlice({
    name: 'gamesetup',
    initialState,
    reducers: {
        setIsHost: (state, action) => {
            state.isHost = action.payload
            console.log("Setting host: "+state.isHost)
        },
        setLobbyNickname: (state, action) => {
            state.lobbyNickname = action.payload
            console.log("Setting lobby nickname: "+state.lobbyNickname)
        },
        setLobbyID: (state, action) => {
            state.lobbyID = action.payload
            console.log("Setting lobby ID: "+state.lobbyID)
        },
        setUser: (state, action) => {
            state.user = action.payload
            console.log("Setting user name: "+state.user)
        },
        setUserID: (state, action) => {
            state.userID = action.payload
            console.log("Setting user name: "+state.user)
        },
    }
});

export const selectIsHost = (state) => state.gamesetup.isHost;
export const selectLobbyID = (state) => state.gamesetup.lobbyID;
export const selectLobbyNickname = (state) => state.gamesetup.lobbyNickname;
export const selectUser = (state) => state.gamesetup.user;
export const selectUserID = (state) => state.gamesetup.userID;

export const { 
    setIsHost, 
    setLobbyID, 
    setLobbyNickname, 
    setUser, 
    setUserID } = gamesetupSlice.actions;

export default gamesetupSlice.reducer;