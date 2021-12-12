import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectTriviaQuestions, addMessage, selectTriviaStatus } from './playSlice'
import {closeModal} from '../../common/modalSlice'
import TextBox from '../../common/TextBox'
import PopupButton from '../../common/PopupButton'
import './latinise'
var he = require('he');


export default function TriviaCardComponent(props){
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const getTrivia = useSelector(selectTriviaQuestions);
    const [trivia, setTrivia] = useState({});
    const status = useSelector(selectTriviaStatus);
    
    

    const [width, setWidth] = useState(500);
    const [messageBack, setMessageBack] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [playerAnswer, setPlayerAnswer] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    
    var textboxValue;
    useEffect(()=>{
        if(status === "filfilled"){
            setTrivia(getTrivia[4]);
            const triviaItem = getTrivia[1];
            setMessage(he.decode(triviaItem.question));
            setCorrectAnswer(he.decode(triviaItem.correct_answer));
            setWidth(500);
            const interval = setInterval(() => {
                setWidth((lastWidth) => {
                    const currentWidth = lastWidth - 50;
                    if (currentWidth === 0) {
                        clearInterval(interval);
                        evaluate();
                    }
                    return currentWidth;
                });
            }, 1000);

        }
    },[])

    function evaluate(){
        //dispatch(addMessage(`Question: ${message}`));
        
        if((typeof playerAnswer[0] !== 'undefined')&&(playerAnswer.toLowerCase() === (correctAnswer).toLowerCase()
            || playerAnswer[0].toLowerCase() === correctAnswer[0].toLowerCase())){
                setIsCorrect(true);
                setMessageBack("Genius!");
            }
            else{
                setIsCorrect(false);
                setMessageBack("Better luck next time!");
            }
            setIsFlipped(true);
            sleep(2000)

            .then(()=>sendScores());
    }

    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve, ms));
    }

    function sendScores(){
        var txt = "";
        if(isCorrect){
            txt = "Player answered correctly"
        }
        else{
            txt = `Player answered incorrectly. The correct answer is ${correctAnswer}`;
        }
        //dispatch(addMessage(txt));
        dispatch(closeModal());
    }

    const handleChange = (evt)=>{
        setPlayerAnswer(evt.target.value);
    }

    return(
        <Container>
        <Timer>
            <InnerTimer width={width}/>
        </Timer>
        <CardContainer>
            <Card isFlipped={isFlipped}>
                <CardFront isFlipped={isFlipped}>
                    <label>{message}</label>
                    <TextBox placeholder="True or False" value={textboxValue}
                    onChange={handleChange} bg="white" isValid={true}/>
                    <PopupButton text="Enter" click={evaluate} isDisabled={false}/>
                </CardFront>
                <CardBack isCorrect={isCorrect}>
                    <label>{messageBack}</label>
                    {!isCorrect && <><br></br><label>Correct answer: {correctAnswer}</label></>}
                </CardBack>
            </Card>
        </CardContainer>
        
        </Container>
    );    
}
//STYLE
const Container = styled.div`
    position: absolute;
    left: 33%;
    top: 33%;
    height: 306px;
    width: 540px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
`;
const CardContainer = styled.div`
    background-color: transparent;
    height: 300px;
    width: 540px;
    perspective: 1000px;
`;
const Card = styled.div`
    position: relative;
    height: 300px;
    width: 540px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
        0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 25px;
    color: #ffffff;
    z-index: 10;
    transform-style: preserve-3d;
    transition: .5s linear .1s;
    transform: ${props=>props.isFlipped?"rotateY(180deg)":""};
`;
const CardFront = styled.div`
    position: absolute;
    background-color: #56c7ff;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
`;
const CardBack = styled.div`
    position: absolute;
    background-color: ${props=>props.isCorrect?"green":"red"};
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: .5s linear .1s;
    transform: rotateY(180deg);
`;
const Timer = styled.div`
  height: 16px;
  width: 500px;
  background-color: transparent;
  border-radius: 50px;
`;
const InnerTimer = styled.div`
  position: relative;
  height: 16px;
  width: ${(props) => props.width}px;
  background-color: #00b800;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  transition: 1s;
`;