import React from 'react'
import styled from 'styled-components'
import board from '../../assets/board2.png'

export default function BoardComponent(props){
    const array = []
    const rowStarts=[100,90,80,70,60,50,40,30,20,10]
    
    rowStarts.forEach(num=>{
        if((num/10)%2 > 0){
            for(var j = num-9; j <= num; j++){
                array.push(j);
            }
        }
        else{
            for(var i = num; i >= num-9; i--){
                array.push(i);
            }
        }
    })

    return(
        <BoardContainer board={board}>
            <OverlayGrid>
                {
                    array.map(num=>{
                        return (
                            <GridBlock area={num} onClick={()=>alert(`You clicked on ${num}`)}>{num}</GridBlock>
                        )
                    })
                }
            </OverlayGrid>
        </BoardContainer>
    )
}

// STYLE
const BoardContainer = styled.div`
    padding: 0px;
    margin-top: 120px;
    width: 1133px;
    height: 802px;
    background-image: url(${props=>props.board});
    position: absolute;
`;
const OverlayGrid = styled.div`
    position: absolute;
    bottom: 21px;
    right: 165px;
    transform: rotateX(54.736deg) rotateY(0deg)  rotateZ(45deg);
    width: 801px;
    height: 801px;
    display: grid;
    grid-template-columns: repeat(10,72px);
    grid-template-rows: repeat(10, 72px);
    column-gap: 9px;
    row-gap: 9px;
    `;
const GridBlock = styled.div`
    grid-area: "${props=>`${props.area}`}";
    height: 72px;
    width: 72px;
    text-align: center;
    font-family: Coiny;
    font-size: 32px;
    color: #A1DD8F;
    -webkit-text-stroke: 2px #1A8711;
    line-height: 72px;
`;
//101.82338