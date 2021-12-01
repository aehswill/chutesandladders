export default class Lobby{
    constructor(name, id, players, gamestate){
        this.name = name;
        this.id = id;
        this.isPublic = true;
        const temp = []
        players.forEach(player=>temp.push(player));
        this.players = temp;
        this.gamestate = gamestate;
        this.difficulty = "easy"
    }
}