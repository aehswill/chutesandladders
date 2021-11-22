import {customAlphabet} from 'nanoid'

export default class Player{
    constructor(id, name, isRobot, isHost){
        this.nickname = name;
        this.isRobot = isRobot;
        this.isHost = isHost;
        if(id === null || id === ""){
            this.player_uuid = this.GenerateID();
        }
        else{
            this.player_uuid = id;
        }
        console.log(`New Player:: name:${this.nickname}, id:${this.player_uuid}, isRobot:${this.isRobot}, isHost:${this.isHost}`);
    }

    GenerateID(){
        const nanoid = customAlphabet("ABCDEF0123456789", 36);
        return nanoid();
    }

}