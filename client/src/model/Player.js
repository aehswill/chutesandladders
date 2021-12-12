export default class Player{
    constructor(id, name, isRobot, isHost){
        this.player_uid = id;
        this.nickname = name;
        this.isRobot = isRobot;
        this.isHost = isHost;
        this.color = "transparent";
        this.position = 1;
        this.total_points = 0;
        this.speed_points = 0;
        this.trivia_points = 0;
    }

}