export default class GameState{
    constructor(triviaQ, triviaA, player){
        this.player = player;
        this.active_trivia_question = triviaQ;
        this.active_trivia_answer = triviaA;
    }
}