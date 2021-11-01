import React from 'react'
import styled from 'styled-components'
import TextBox from './TextBox'
import StartButton from './StartButton'

export default class HostGameGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    render(){
        return(
        <div className="host-game">
            <h1>Host a New Game</h1>
            <TextBox placeholder="Lobby Nickname"/>
            <StartButton text="START"/>
        </div>
        );
    }
}