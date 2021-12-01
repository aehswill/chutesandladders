import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMessages } from "./playSlice";

export default function MessageBoxComponent(props){
    const getMessages = useSelector(selectMessages);

    return(
        <MessageBox>
            <List>
                {
                    getMessages.map((message)=>(
                        <ListItem>{(new Date()).toLocaleTimeString('en-US') + "   " + message}</ListItem>
                    ))
                }
            </List>
        </MessageBox>
    )
}


// Style
const MessageBox = styled.div`
    position: absolute;
    bottom: 12px;
    left: 20px;
    height: 200px;
    width: 400px;
    display: flex;
    justify-contents: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #DDF1FF;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(255,255,255,0.35);
    box-sizing: border-box;
    border-radius: 8px;
`;
const List = styled.ul`
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 4px;
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
    scrollbar-width: thin;          /* "auto" or "thin" */
    scrollbar-color:  #eac4ba #881400;   /* scroll thumb and track */
    &::-webkit-scrollbar{
        border-radius: 16px;
        width: 12px; 
    }
    &::-webkit-scrollbar-track {
        background: #881400;        /* color of the tracking area */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #eac4ba;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid #881400;  /* creates padding around scroll thumb */
      }
`;
const ListItem = styled.li`
    font-size: 24px;
    color: black;
    font-family: Roboto;
    font-weight: 500
`;