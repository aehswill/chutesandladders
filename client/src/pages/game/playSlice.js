// messages from gamestate
// turn from gamestate
// active player ID from gamestate
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const url = window.location.href;
const lobbyID = url.split("/")[4];

export const fetchLobby = createAsyncThunk(
    'play/fetchLobby',
    (id)=>axios.get(`http://localhost:5000/api/v1/lobbies/${id}`)
    .then(response=>response.data)
    .catch(error=>error)
)
export const sendGamestate = createAsyncThunk(
    'play/sendGamestate',
    (lobby)=>axios.put(`http://localhost:5000/api/v1/lobbies/${window.location.href.split("/")[4]}/gamestate`, lobby)
    .then(res=>res.data)
    .catch(error=>error)
)
export const fetchTrivia = createAsyncThunk(
    'play/fetchTrivia',
    (difficulty)=>axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`)
    .then(res=>res.data)
    .catch(error=>error)
)

const initialState = {
    messages: [],
    turn: 0,
    active_player: {},
    trivia_questions: [],
    trivia_result: false,
    lobby: {},
    status: "",
    triviaStatus: ""
}

export const playSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        setTriviaQuestions: (state, action) => {
            state.trivia_questions = action.payload;
        }
    },
    extraReducers: {
        [fetchLobby.fulfilled]: (state, action) => {
            state.lobby = action.payload;
            state.status = "fulfilled";
        },
        [fetchLobby.pending]: (state, action) => {
            state.status = "pending";
        },
        [sendGamestate.fulfilled]: (state, action) => {
            state.lobby.gamestate = action.payload;
        },
        [fetchTrivia.fulfilled]: (state, action) => {
            const temp = (action.payload.results).map((result)=>{
                return ({question: result.question, correct_answer: result.correct_answer, incorrect_answers: result.incorrect_answers})
            })
            temp.forEach(question=>state.trivia_questions.push(question));
            state.triviaStatus = "fulfilled";
        },
        [fetchTrivia.pending]: (state, action) => {
            state.triviaStatus = "pending";
        },
    }
});

export const selectTriviaQuestions = (state) => state.play.trivia_questions;
export const selectLobby = (state) => state.play.lobby;
export const selectStatus = (state) => state.play.status;
export const selectTriviaStatus = (state) => state.play.triviaStatus;

export const {setTriviaQuestions} = playSlice.actions;

export default playSlice.reducer;