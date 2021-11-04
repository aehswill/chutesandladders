import React from 'react'
import TextBox from './TextBox'
import StartButton from './StartButton'

export default class JoinSpecifc extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    render(){
        return(
        <div className="join-specific">
            <h1>Join a Game</h1>
            <TextBox placeholder="Lobby ID"/>
            <StartButton text="JOIN"/>
        </div>
        );
    }
}