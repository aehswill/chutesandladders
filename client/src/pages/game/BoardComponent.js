import React from 'react'
import styled from 'styled-components'
import board from '../../assets/board2.png'
import blueT from '../../assets/tokens/token_blue.svg'
import purpleT from '../../assets/tokens/token_purple.svg'
import yellowT from '../../assets/tokens/token_yellow.svg'
import orangeT from '../../assets/tokens/token_orange.svg'

export default function BoardComponent(props){
    const array = []
    const rowStarts=[100,90,80,70,60,50,40,30,20,10]
    const bluePosition = props.bluePosition;
    const orangePosition = props.orangePosition;
    const yellowPosition = props.yellowPosition;
    const purplePosition = props.purplePosition;
    const positions = [];

    console.log(props);

    let rowLine = 1;
    let columnLine = 1;
    rowStarts.forEach(num=>{
        columnLine = 1;
        if((num/10)%2 > 0){ //odd 10s place
            for(var j = num-9; j <= num; j++){
                array.push(j);
                positions.push({position:j, row:`${rowLine}/${rowLine+1}`, column:`${columnLine}/${columnLine+1}`});
                columnLine++;
            }
        }
        else{ //even 10s place
            for(var i = num; i >= num-9; i--){
                array.push(i);
                positions.push({position:i, row:`${rowLine}/${rowLine+1}`, column:`${columnLine}/${columnLine+1}`});
                columnLine++;
            }
        }
        rowLine++;
    })
    

    return(
        <BoardContainer board={board}>
            <OverlayGrid>
                <Token column={(positions.find(i=> i.position === bluePosition) ?? 0).column} row={(positions.find(i=> i.position === bluePosition) ?? 0).row} src={blueT} alt="blue token"/>
                <Token column={(positions.find(i=> i.position === purplePosition) ?? 0).column} row={(positions.find(i=> i.position === purplePosition) ?? 0).row} src={purpleT} alt="purple token"/>
                <Token column={(positions.find(i=> i.position === orangePosition) ?? 0).column} row={(positions.find(i=> i.position === orangePosition) ?? 0).row} src={orangeT} alt="orange token"/>
                <Token column={(positions.find(i=> i.position === yellowPosition) ?? 0).column} row={(positions.find(i=> i.position === yellowPosition) ?? 0).row} src={yellowT} alt="yellow token"/>
                {
                    positions.map(num=>{
                        return (
                            <GridBlock column={num.column} row={num.row} onClick={()=>alert(`You clicked on ${num.position}`)}>{num.position}</GridBlock>
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
    z-index: -1;
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
    z-index: 0;
    transition: 1s;
    `;
const GridBlock = styled.div`
    grid-column: ${props=>props.column};
    grid-row: ${props=>props.row};
    height: 72px;
    width: 72px;
    text-align: center;
    font-family: Coiny;
    font-size: 32px;
    color: #A1DD8F;
    -webkit-text-stroke: 2px #1A8711;
    line-height: 72px;
    z-index: 0;
`;
const Token = styled.img`
    grid-column: ${props=>props.column};
    grid-row: ${props=>props.row};
    place-self: center;
    margin-right: 4px;
    margin-bottom: 4px;
    transform-style: preserve-3d;
    transform:  rotateZ(-45deg) rotateY(-54.736deg);
    z-index:12;
    transition: transform 1s;
`;
//101.82338

/* grid-template-areas:
    "100 99 98 97 96 95 94 93 92 91"
    "81 82 83 84 85 86 87 88 89 90"
    "80 79 78 77 76 75 74 73 72 71"
    "61 62 63 64 65 66 67 68 69 70"
    "60 59 58 57 56 55 54 53 52 51"
    "41 42 43 44 45 46 47 48 49 50"
    "40 39 38 37 36 35 34 33 32 31"
    "21 22 23 24 25 26 27 28 29 30"
    "20 19 18 17 16 15 14 13 12 11"
    "1 2 3 4 5 6 7 8 9 10"
;    */ 