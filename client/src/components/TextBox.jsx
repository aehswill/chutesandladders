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
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
`;

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // handle form submit
    }

    render() {
        return(
            <Input placeholder={this.props.placeholder}/>
        );
    }
}

export default TextBox;