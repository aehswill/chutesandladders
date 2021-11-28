import React from 'react'
import styled from 'styled-components'

export default function TextBox(props){
  if(!props.isValid){
    return(
    <div className="tooltip">
        <TextField placeholder={props.placeholder} 
        type="text" 
        value={props.value} 
        onChange={props.onChange}
        background={props.bg}
        isValid={props.isValid}/>
        <span className="tooltiptext">{props.helpText}</span>
      </div>
  );
  }
  else{
    return(
      <div className="tooltip">
        <TextField placeholder={props.placeholder} 
        type="text" 
        value={props.value} 
        onChange={props.onChange}
        background={props.bg}
        isValid={props.isValid}/>
      </div>
    );
  }
}

// STYLE
const TextField = styled.input`
  width: 411px;
  height: 53px;
  background-color: ${props => (props.isValid? props.background || "transparent" : "rgba(255,0,0,0.2)" )};
  margin: 12px;
  padding: 4px 4px;
  align-self: center;
  justify-self: center;
  text-align: left;
  letter-spacing: -0.015em;
  color: ${props=>props.isValid?"#000000":"#FF9E89"};
  border: ${props => (props.isValid ? "2px solid #FFFFFF" : "2px solid red")};
  box-sixing: border-box;
  border-radius: 2px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 45px;
  filter: drop-shadow(0px 4px 3px rgba(0,0,0,0.25));
  &:focus{
    outline: ${props => (props.isValid? "1px solid white" : "1px solid red")};
    box-shadow: 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.2);
  }
  &::placeholder{
    color: ${props=>props.isValid?"#504F4F":"#FF9E89"};
    opacity: 1;
  }
  &:-ms-input-placeholder{
    color: ${props=>props.isValid?"#504F4F":"#FF9E89"};
  }
  &::-ms-input-placeholder{
    color: ${props=>props.isValid?"#504F4F":"#FF9E89"};
  }
`;