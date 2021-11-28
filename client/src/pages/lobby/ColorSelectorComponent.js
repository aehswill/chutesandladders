import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMyColor, setIsBlueTaken, setIsOrangeTaken, setIsPurpleTaken, setIsYellowTaken} from './lobbysetupSlice'
import { selectIsBlueTaken, selectIsOrangeTaken, selectIsPurpleTaken, selectIsYellowTaken} from './lobbysetupSlice'
import { yellow, orange, purple, blue} from './lobbysetupSlice'



export default function ColorSelectorComponent(props){
    const [blueSelected, setBlue] = React.useState(false);
    const [orangeSelected, setOrange] = React.useState(false);
    const [purpleSelected, setPurple] = React.useState(false);
    const [yellowSelected, setYellow] = React.useState(false);

    const dispatch = useDispatch();
    const blueTaken = useSelector(selectIsBlueTaken);
    const orangeTaken = useSelector(selectIsOrangeTaken);
    const purpleTaken = useSelector(selectIsPurpleTaken);
    const yellowTaken = useSelector(selectIsYellowTaken);

    // should probably make the colors radio buttons but... oh well
    return(
        <Container>
            <Title>Choose your color:</Title>
            <ColorContainer>
                <ColorButton color={yellow} isTaken={yellowTaken} selected={yellowSelected} onClick={()=>{
                    dispatch(setMyColor(`${yellow}`));
                    // send color choice to backend
                    setYellow(true);
                    setPurple(false);
                    setBlue(false);
                    setOrange(false);
                    props.click(`${yellow}`) //update players in redux
                }}>
                    {yellowTaken && <X>&#10005;</X>}
                </ColorButton>
                <ColorButton color={purple} isTaken={purpleTaken} selected={purpleSelected} onClick={()=>{
                    dispatch(setMyColor(`${purple}`));
                    // send color choice to backend
                    setYellow(false);
                    setPurple(true);
                    setBlue(false);
                    setOrange(false);
                    props.click(`${purple}`) //update players in redux
                }}>
                    {purpleTaken && <X>&#10005;</X>}
                </ColorButton>
                <ColorButton color={blue} isTaken={blueTaken} selected={blueSelected} onClick={()=>{
                    dispatch(setMyColor(`${blue}`));
                    // send color choice to backend
                    setYellow(false);
                    setPurple(false);
                    setBlue(true);
                    setOrange(false);
                    props.click(`${blue}`) //update players in redux
                }}>
                    {blueTaken && <X>&#10005;</X>}
                </ColorButton>
                <ColorButton color={orange} isTaken={orangeTaken} selected={orangeSelected} onClick={()=>{
                    dispatch(setMyColor(`${orange}`));
                    // send color choice to backend
                    setYellow(false);
                    setPurple(false);
                    setBlue(false);
                    setOrange(true);
                    props.click(`${orange}`) //update players in redux
                }}>
                    {orangeTaken && <X>&#10005;</X>}
                </ColorButton>
            </ColorContainer>
        </Container>
    );
}
// &#10005;
//style
const Container = styled.div`
    margin: 40px 0px;
    width: 280px;
    height: 60px;
`;
const Title = styled.h1`
    font-size: 28px;
    -webkit-text-stroke: 1px black;
`;
const ColorContainer = styled.div`
    margin: 12px 8px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 4px;
`;
const ColorButton = styled.button`
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    border: ${props=>props.selected?"5px solid black":"5px solid transparent"};
    background-color: ${props=>props.color};
    background: ${props=>props.isTaken?`linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), ${props.color}`:"null"};
    display: ${props=>props.isTaken?"flex":"null"};
    :hover{
        border: 5px solid #00FF48;
    }
`;
const X = styled.span`
    font-size: 45px;
    line-height: 30px;
`;