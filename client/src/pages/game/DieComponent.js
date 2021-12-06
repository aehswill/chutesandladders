import React, {useState} from 'react'
import styled from 'styled-components'
import die1 from '../../assets/die/die1.png'
import die2 from '../../assets/die/die2.png'
import die3 from '../../assets/die/die3.png'
import die4 from '../../assets/die/die4.png'
import die5 from '../../assets/die/die5.png'
import die6 from '../../assets/die/die6.png'

export default function DieComponent(props){
    const [isClicked, setIsClicked] = useState(false);
    const isActive = props.isActive;
    return(
        <Scene onClick={()=>{
            if(!isClicked && isActive){
                props.roll();
                setIsClicked(true);
            }
        }}>
            <Cube xform={props.transformTo}>
                <One><Icon src={die1} alt="1" isClicked={isClicked} isActive={isActive}/></One>
                <OneInner/>
                <Two><Icon src={die2} alt="2" isClicked={isClicked} isActive={isActive}/></Two>
                <TwoInner/>
                <Three><Icon src={die3} alt="3" isClicked={isClicked} isActive={isActive}/></Three>
                <ThreeInner/>
                <Four><Icon src={die4} alt="4" isClicked={isClicked} isActive={isActive}/></Four>
                <FourInner/>
                <Five><Icon src={die5} alt="5" isClicked={isClicked} isActive={isActive}/></Five>
                <FiveInner/>
                <Six><Icon src={die6} alt="6" isClicked={isClicked} isActive={isActive}/></Six>
                <SixInner/>
                <CoverX/>
                <CoverY/>
                <CoverZ/>
            </Cube>
        </Scene>
    );
}

const Scene = styled.div`
    margin-left: 24px;
    width: 75px;
    height: 75px;
    perspective: 225px;  
`;
const Cube = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-37.5px);
    transition: transform 2s;
    background-color: #00B800;
    transform: ${props=>{
            switch(props.xform){
                case 1:
                    return "rotateX(270deg) rotateY(720deg) rotateZ(360deg)";
                case 2:
                    return "rotateX(720deg) rotateY(900deg) rotateZ(720deg)";
                case 3:
                    return "rotateX(720deg) rotateY(810deg) rotateZ(360deg)";
                case 4:
                    return "rotateX(720deg) rotateY(630deg) rotateZ(720deg)";
                case 5:
                    return "rotateX(720deg) rotateY(720deg) rotateZ(360deg)";
                case 6:
                    return "rotateX(450deg) rotateY(720deg) rotateZ(360deg)";
                default:
                    return "";
            }
        }
    };
`;
const One = styled.div`/*top*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 35px #1A8711;
    transform: rotateX( 90deg) translateZ(37.5px);
`;
const OneInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateX( 90deg) translateZ(36.75px);
`;
const Two = styled.div`/*back*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 24px #1A8711;
    transform: rotateY(180deg) translateZ(37.5px);
`;
const TwoInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateY( 180deg) translateZ(36.75px);
`;
const Three = styled.div`/*left*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 24px #1A8711;
    transform: rotateY(-90deg) translateZ(37.5px);
`;
const ThreeInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateY( -90deg) translateZ(36.75px);
`;
const Four = styled.div`/*right*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 24px #1A8711;
    transform: rotateY( 90deg) translateZ(37.5px);
`;
const FourInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateY( 90deg) translateZ(36.75px);
`;
const Five = styled.div`/*front*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 24px #1A8711;
    transform: rotateY(  0deg) translateZ(37.5px);
`;
const FiveInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateY( 0deg) translateZ(36.75px);
`;
const Six = styled.div`/*bottom*/
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #00B800;
    box-shadow: inset 0 0 24px #1A8711;
    transform: rotateX(-90deg) translateZ(37.5px);
`;
const SixInner = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 15px;
    background-color: #1A8711;
    box-shadow: none;
    transform: rotateX( -90deg) translateZ(36.75px);
`;
const CoverX = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 0px;
    transform: rotateY(90deg);
    background: #1A8711;
`;
const CoverY = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 0px;
    transform: translateZ(0px);
    background: #1A8711;
`;
const CoverZ = styled.div`
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 0px;
    transform: rotateX(90deg);
    background: #1A8711;
`;
const Icon = styled.img`
    position: absolute;
    cursor: ${props=>props.isClicked?"arrow":"pointer"};
    top:-3px;
    left:-3px;
    width: 75px;
    height: 75px;
    border: ${props=>props.isClicked?"3px solid transparent":props.isActive?"3px solid yellow":"3px solid transparent"};
    border-radius: 15px;
    &:hover{
        
    }
`;