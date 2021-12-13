import axios from 'axios'
export default class GameHelper{
    constructor(){
        this.lobbyID = '';
        this.playerID = '';
        this.lobby = {};
        this.playerNames = [];
        this.isHost = false;
        this.triggerModal = false;
    }

    set lobby(value){
        this._lobby = value;
    }

    get lobby(){
        return this._lobby;
    }

    initialize = (playerID, lobbyID) => {
        var self = this;
        // this runs once right when the game page loads
        let status = '';
        self.lobbyID = lobbyID;
        self.playerID = playerID;
        self.getLobby()
        .then(()=>{
            console.log(self.lobby);
            if(typeof self.lobby !== 'undefined' && self.lobby !== null){
                // break up the data to send into the components where it is needed
                self.lobby.players.forEach(player=>{
                    self.playerNames.push(player.nickname);
                    if((player.player_uid === playerID)){
                        if(player.isHost){
                            // self player is the host
                            self.host = player.player_uid;
                            if(self.lobby.turn === 0){
                                // make sure it's the first turn, just in case
                                self.lobby.gamestate.turn++;
                                self.lobby.gamestate.active_player = self.host;
                                self.lobby.gamestate.board_positions = {
                                    orange: 1,
                                    blue: 1,
                                    purple: 1,
                                    yellow: 1
                                };
                                self.board_positions = self.lobby.gamestate.board_positions;
                                self.updateGamestate();
                                status = "playing";
                            }
                        }
                        else{
                            // the non-host client is waiting
                            status = "waiting"
                        }
                        
                    }
                })
        
                }
                return status;
        })
        
        
        // stretch goal: get a token from open trivia to use when requesting questions
    }

    play = (roll) => {
        // triggers when player clicks die
        this.setPosition(this.lobby.gamestate.active_player.color, roll);
        this.pushMessage(`${this.lobby.gamestate.active_player.nickname} rolled a ${roll}!`);
        this.updateGamestate();

        // is there a pipe at this location?
        let pipeIndex = this.pipePositions.findIndex(element=> element.start === roll);
        if(pipeIndex > -1){
            this.triggerModal = true;
        }
        else{
            this.lobby.gamestate.active_player = this.getNextPlayer(this.lobby.players);
            this.lobby.gamestate.turn++;
            this.updateGamestate();
        }

    }

    robotplay = () => {
        // const choice = (Math.floor(Math.random() * (3-1) + 1)) === 1?"true":"false";
    }

    waitLoop = () => {
        // loop getLobby until I am the active player
        // or until I am the host and the player is robot
        let lob = this.getLobby();
        this.lobby = lob;
        let status = '';
        if(this.lobby.gamestate.active_player === this.playerID){
            status = 'playing';
        }
        else if(this.isHost && this.lobby.gamestate.active_player.isRobot){
            status = 'robot_playing';
        }
        else{
            status = 'waiting';
        }
        return status;
    }

    pushMessage = (message) => {
        this.lobby.gamestate.messages.push(`[${(new Date()).toLocaleTimeString('en-US')}] ${message}`);
    }

    getNextPlayer = (players) => {
        let indexOfCurrent = players[players.indexOf(this.lobby.gamestate.active_player)];
        // if we're at the end of the list, start over at the begining
        let indexOfNext = indexOfCurrent > 3 ? 0 : indexOfCurrent + 1;
        return players[indexOfNext];
    }
    
    static getTrivia = (difficulty) => {
        return this.getFormattedTriviaBank(difficulty)[0];
    }
    
    // the positions need to be added to the database so that 
    // everyone knows the board state
    setPosition = (color, position) => {
        switch(color){
            case this.blue:
                this.bluePosition = position;
                break;
            case this.purple:
                this.purplePosition = position;
                break;
            case this.orange:
                this.orange = position;
                break;
            case this.yellow:
                this.yellow = position;
                break;
            default:
                break;
        }
        // set backend
    }



    // "Internal" functions
    getLobby = () => {
        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${this.lobbyID}/`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
        })
        .then(lobby=>{
            return lobby.data;
        })
        .catch(error=>{
            return("Error in GameHelper.getLobby: " + error);
        })
    }

    getGamestate = () => {
        axios.get(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${this.lobbyID}/gamestate/`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
        })
        .then(gamestate=>{
            return gamestate.data;
        })
        .catch(error=>{
            console.log("Error in GameHelper.getGamestate: " + error);
            return null;
        })
    }

    static getFormattedTriviaBank = (difficulty) => {
        axios.get(`httpss://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=boolean`)
        .then(res=>{
            const temp = (res.data.results).map((result)=>{
                return ({question: result.question, correct_answer: result.correct_answer, incorrect_answers: result.incorrect_answers})
            })
            return temp;
        })
        .catch(error=>{
            console.log("Error in GameHelper.getFormattedTriviaBank: "+error);
        })

    }

    updateGamestate = (lobby) => {
        axios.put(`https://puzzlingpipes-api.azurewebsites.net/api/v1/lobbies/${this.lobbyID}/gamestate/`, lobby, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS'}
        })
        .then(gamestate=>{
            return gamestate.data
        })
        .catch(error=>{
            console.log("Error in GameHelper.updateGamestate: " + error);
            return null;
        })
    }

    pipePositions = [
        {type:"green", start:1, end:38},
        {type:"green", start:4, end:14},
        {type:"green", start:9, end:31},
        {type:"green", start:28, end:84},
        {type:"green", start:21, end:42},
        {type:"green", start:36, end:44},
        {type:"green", start:51, end:67},
        {type:"green", start:71, end:91},
        {type:"green", start:80, end:100},
    
        {type:"red", start:16, end:6},
        {type:"red", start:48, end:28},
        {type:"red", start:49, end:11},
        {type:"red", start:56, end:53},
        {type:"red", start:62, end:19},
        {type:"red", start:64, end:60},
        {type:"red", start:87, end:24},
        {type:"red", start:93, end:73},
        {type:"red", start:95, end:75},
        {type:"red", start:98, end:78}
    ]

    orange = "#FC7438";
    purple = "#B117EB";
    blue = "#005BF5";
    yellow = "#FFE424";

}