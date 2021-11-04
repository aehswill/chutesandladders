import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

class PlayerPortrait extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''}
    }

    render(){
        var icon = <FontAwesomeIcon icon={faUser} size='2x'/>
        if(this.props.isRobot){
            icon = <FontAwesomeIcon icon={faRobot} size='2x'/>
        }
        return(icon);
    }
}

export default PlayerPortrait