import React from 'react'
import styled from 'styled-components';

const orange = "#FC7438";
const purple = "#B117EB";
const blue = "#005BF5";
const yellow = "#FFE424";

export default function ColorSelectorComponent(props){
    return(
        <Container>
            <Title>Choose your color:</Title>
            <ColorContainer>
                <ColorButton color={yellow}/>
                <ColorButton color={purple}/>
                <ColorButton color={blue}/>
                <ColorButton color={orange}/>
            </ColorContainer>
        </Container>
    );
}

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
const ColorButton = styled.div`
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    :hover{
        border: 3px solid black;
    }
`;