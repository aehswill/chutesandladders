export default class GameState{
    constructor(player){
        this.hasStarted = false;
        this.turn = 0;
        this.active_player_uid = player.player_uid;
        this.trivia_question = "empty";
        this.trivia_answer = "empty";
        this.player_answer = "empty";
        this.messages = [{message: "Play!"}];
    }
}