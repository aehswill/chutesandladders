import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 400px;
  height: 45px;
  background-color: transparent;
  margin: 12px;
  padding: 4px 4px;
  align-self: center;
  justify-self: center;
  text-align: center;
  letter-spacing: -0.015em;
  color: #504F4F;
  border: 2px solid #FFFFFF;
  box-sixing: border-box;
  border-radius: 2px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 45px;
  &:focus{
    outline: 1px solid white;
    box-shadow: 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.2);
  }
`;

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
        return(
            <Input placeholder={this.props.placeholder}/>
        );
    }
}

export default TextBox;