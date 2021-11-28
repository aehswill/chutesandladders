import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isPublicGame: false, 
    myColor: 'empty',
    isYellowTaken: false, 
    isPurpleTaken: false, 
    isOrangeTaken: false,
    isBlueTaken: false,
}

export const lobbysetupSlice = createSlice({
    name: 'lobbysetup',
    initialState,
    reducers: {
        setIsPublicGame: (state, action) => {
            state.isPublicGame = action.payload
            console.log("Setting Public Game: "+state.isPublicGame)
            const url = window.location.href;
            const id = url.substring(url.lastIndexOf('/') + 1);
            const res =  axios.put(`http://localhost:5000/api/v1/lobbies/${id}`, {
                isPublic: (action.payload),
            });
            res.then(function(response){
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        },
        setMyColor: (state, action) => {
            state.myColor = action.payload
            console.log("Setting my color to: "+state.myColor)
        },
        setIsYellowTaken: (state, action) => {
            state.isYellowTaken = action.payload
            console.log("Setting yellow taken: "+state.isYellowTaken)
        },
        setIsPurpleTaken: (state, action) => {
            state.isPurpleTaken = action.payload
            console.log("Setting purple taken: "+state.isPurpleTaken)
        },
        setIsOrangeTaken: (state, action) => {
            state.isOrangeTaken = action.payload
            console.log("Setting orange taken: "+state.isOrangeTaken)
        },
        setIsBlueTaken: (state, action) => {
            state.isBlueTaken = action.payload
            console.log("Setting blue taken: "+state.isBlueTaken)
        },
    }
});

export const selectIsPublicGame = (state) => state.lobbysetup.isPublicGame;
export const selectMyColor = (state) => state.lobbysetup.myColor;
export const selectIsYellowTaken = (state) => state.lobbysetup.isYellowTaken;
export const selectIsPurpleTaken = (state) => state.lobbysetup.isPurpleTaken;
export const selectIsOrangeTaken = (state) => state.lobbysetup.isOrangeTaken;
export const selectIsBlueTaken = (state) => state.lobbysetup.isBlueTaken;

export const { 
    setIsPublicGame, 
    setMyColor, 
    setIsYellowTaken, 
    setIsPurpleTaken, 
    setIsOrangeTaken, 
    setIsBlueTaken } = lobbysetupSlice.actions;

export default lobbysetupSlice.reducer;