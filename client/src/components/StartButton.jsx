import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  /* This renders the buttons above... Edit me! */
  padding: 0px 34px;
  height: 52px;
  line-height: 46px;
  color: white;
  align-self: center;
  justify-self: center;
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  border: 3px solid;
  border-image-source: linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 100%);
  background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%), #881400;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  border-radius: 4px;
`;

class StartButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    onClick(){
        alert("Testing");
    }

    render(){
        return(
            <Button onClick={this.onClick}>{this.props.text}</Button>
        )
    }
}

export default StartButton