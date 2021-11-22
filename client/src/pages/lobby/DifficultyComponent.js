// I am a modal
import React from 'react'
import styled from 'styled-components';
import close from '../../assets/close.png'

export default function DifficultyComponent(props){
    return(
        <OuterContainer>
            <ModalClose onClick={props.close}>
                <img src={close} alt="close"/>
            </ModalClose>
            <InnerContainer>
                <PopupTitle>Bot Difficulty</PopupTitle>
            </InnerContainer>
        </OuterContainer>
);
}

//STYLE
// STYLE
const OuterContainer =styled.div`
    position: absolute;
    top: 23%;
    width: 550px;
    height: 400px;
    border: 3px solid;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #FF9869;
    background-blend-mode: soft-light, normal;
    border-radius: 16px;
    filter: drop-shadow(0px 24px 38px rgba(0,0,0,0.14)) drop-shadow(0px 9px 46px rgba(0,0,0,0.12)) drop-shadow(0px 11px 15px rgba(0,0,0,0.2));
`;
const InnerContainer = styled.div`
position: absolute;
left: 2.39%;
right: 2.39%;
top: 16.05%;
bottom: 5.35%;
padding-bottom: 18px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
border: 3px solid;
border-radius: 8px;
border-image-source: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.5) 100%);
background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.25) 100%), #881400;
`;
const PopupTitle = styled.h2`
font-family: Poppins;
font-style: normal;
font-weight: bold;
font-size: 35px;
line-height: 25px;
color: #FFFFFF;
text-shadow: 0px 2px 4px rgba(91, 26, 26, 0.14), 0px 3px 4px rgba(123,12,12,0.12), 0px 1px 5px rgba(136,13,13,0.2);
`;
const ModalClose = styled.span`
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 24px;
    cursor: pointer;
`;