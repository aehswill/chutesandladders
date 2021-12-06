export default class GameState{
    constructor(player){
        this.hasStarted = false;
        this.turn = 0;
        this.active_player = player;
        this.active_trivia_question = "empty";
        this.player_trivia_answer = "empty";
        this.messages = [{message: "Play!"}];
    }
}