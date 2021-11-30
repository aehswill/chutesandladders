import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import DieComponent from './DieComponent';
import { selectTransformTo, setTransformTo} from './dieSlice';
import BoardComponent from './BoardComponent';
import StartButton from '../../common/StartButton'
import PlayerBox from './HorizonPlayerBoxComponent'

export default function GamePage(props){
    const dispatch = useDispatch();
    const getTransform = useSelector(selectTransformTo);

    const roll= ()=>{
        dispatch(setTransformTo(Math.floor(Math.random() * (7-1) + 1)));
    }
    return(
        <>
        <OuterContainer>
            <TopContainer>
                <ControlBox>
                    <PlayerBox />
                    <DieComponent roll={roll} transformTo={getTransform}/>
                </ControlBox>
                <ButtonBox>
                    <StartButton text="QUIT"/>
                </ButtonBox>
            </TopContainer>
            <BoardComponent/>
        </OuterContainer>
        <DevControls>

        </DevControls>
        </>
    )
}
//<DieComponent roll={roll} transformTo={getTransform}/>

// STYLE
const OuterContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;
const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 400px;
`;
const ControlBox = styled.div`
    margin-top: 44px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;
const ButtonBox = styled.div`
    margin-top: 44px;
    margin-right: 20px;
    margin-left: auto;
`;
const DevControls = styled.div`
    position: absolute;
    bottom: 12px;
    left: 12px;
    height: 300px;
    width: 400px;
    background-color: black;
`;