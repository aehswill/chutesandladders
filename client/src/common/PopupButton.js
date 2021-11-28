import React from 'react'
import styled from 'styled-components'

export default function PopupButton(props){
    return(
      
      <Button onClick={props.click} disabled={props.isDisabled} bgColor={props.color}>
          <ButtonText>{props.text}</ButtonText>
      </Button>
    );
}

// STYLE

const ButtonText = styled.text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 25px;
  color: #FFFFFF;
  line-height: 37px;
  display: flex;
  text-align: center;
  letter-spacing: -0.015em
  text-shadow: 0px 2px 4px rgba(91,26,26,0.14), 0px 3px 4px rgba(123,12,12,0.12), 0px 1px 5px rgba(136,13,13,0.2);
`;

const Button = styled.button`
  height: 48px;
  width: 208px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid rgba(10,10,10,0.35);
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0) 100%), ${props=>typeof(props.bgColor) === 'undefined'?"#00B800":props.bgColor};
  background-blend-mode: soft-light, normal;
  box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
  border-radius: 24px;
  filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.14)) drop-shadow(0px 3px 4px rgba(0,0,0,0.12)) drop-shadow(0px 1px 5px rgba(0,0,0,0.2));
  &:hover{
    border: 3px solid #FFE424;
    box-shadow: 0px 16px 24px rgba(0,0,0,0.14), 0px 6px 30px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.2);
  }
  &:hover ${ButtonText}{
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  &:disabled{
    background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%), #5c5c5c;
    &:hover{
      border: 3px solid rgba(10,10,10,0.35);
      box-shadow: 0px 6px 10px rgba(0,0,0,0.14), 0px 1px 18px rgba(0,0,0,0.12), 0px 3px 5px rgba(0,0,0,0.2);
    }
    &:hover ${ButtonText}{
      text-shadow: none;
    }
  }
`;