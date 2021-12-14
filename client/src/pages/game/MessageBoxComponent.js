import React from "react";
import styled from "styled-components";

// NOT IMPLEMENTED FULLY
export default function MessageBoxComponent(props){
    //const messages = props.messages;
    const messages = [];

    return(
        <MessageBox>
            <List>
                {
                    messages.map((message)=>(
                        <ListItem>{message}</ListItem>
                    ))
                }
            </List>
        </MessageBox>
    )
}
//TODO: bottom justify list, grow towards top

// Style
const MessageBox = styled.div`
    position: absolute;
    bottom: 24px;
    left: 20px;
    height: 200px;
    width: 400px;
    background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.45) 100%), #DDF1FF;
    background-blend-mode: soft-light, normal;
    border: 3px solid rgba(255,255,255,0.35);
    box-sizing: border-box;
    border-radius: 8px;
`;
const List = styled.ul`
    list-style-type: none;
    padding: 12px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
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
    font-size: 16px;
    color: black;
    font-family: Roboto;
    font-weight: 500
`;