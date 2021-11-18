import React from 'react'
import styled from 'styled-components'

export default function StartButton(props){
  return(
    <Button onClick={props.click} disabled={props.isDisabled}>
        <ButtonText>{props.text}</ButtonText>
    </Button>
  );
}

// STYLE
const ButtonText = styled.text`
  line-height: 52px;
  color: white;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
`;

const Button = styled.button`
  padding: 0px 34px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 3px solid rgba(10,10,10,0.35);
  background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%), #881400;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  border-radius: 4px;
  &:disabled{
    background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%), rgba(136,20,0,0.5);
    &:hover{
      border: 3px solid rgba(10,10,10,0.35);
      box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
    }
    &:hover ${ButtonText}{
      text-shadow: none;
    }
  }
  &:hover{
    border: 3px solid #FFE424;
    box-shadow: 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.2);
  }
  &:hover ${ButtonText}{
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;