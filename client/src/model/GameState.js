export default class GameState{
    constructor(player){
        this.hasStarted = false;
        this.turn = 0;
        this.active_player_uid = player.player_uid;
        this.active_trivia_question = "empty";
        this.player_trivia_answer = "empty";
        this.messages = [{message: "Play!"}];
    }
}