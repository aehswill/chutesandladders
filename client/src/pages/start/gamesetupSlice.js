import { createSlice } from '@reduxjs/toolkit'

const initialState = {isHost: false, idToJoin: 'empty', lobbyNickname: 'empty', user: 'empty'}

export const gamesetupSlice = createSlice({
    name: 'gamesetup',
    initialState,
    reducers: {
        setIsHost: (state, action) => {
            state.isHost = action.payload
            console.log("Setting host: "+state.isHost)
        },
        setIdToJoin: (state, action) => {
            state.idToJoin = action.payload
            console.log("Setting Lobby ID: "+state.idToJoin)
        },
        setLobbyNickname: (state, action) => {
            state.lobbyNickname = action.payload
            console.log("Setting lobby nickname: "+state.lobbyNickname)
        },
        setUser: (state, action) => {
            state.user = action.payload
            console.log("Setting user name: "+state.user)
        },
    }
});

export const selectIsHost = (state) => state.gamesetup.isHost;
export const selectLobbyID = (state) => state.gamesetup.idToJoin;
export const selectLobbyNickname = (state) => state.gamesetup.lobbyNickname;
export const selectUser = (state) => state.gamesetup.user;

export const { setIsHost, setIdToJoin, setLobbyNickname, setUser } = gamesetupSlice.actions;

export default gamesetupSlice.reducer;