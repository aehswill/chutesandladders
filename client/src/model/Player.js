export default class Player{
    constructor(id, name, isRobot, isHost){
        this.nickname = name;
        this.isRobot = isRobot;
        this.difficulty = "";
        this.isHost = isHost;
        this.color = "transparent";
        this.player_uuid = id;
    }

}