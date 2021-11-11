import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, selectModalState } from './modalSlice'
import styled from 'styled-components'



export default function Modal(){
    const dispatch = useDispatch();
    const isOpen = useSelector(selectModalState);

    if(!isOpen){
        return null;
    }
    
    return(
        <ModalOverlay>
            <ModalContent>
                <ModalClose onClick={()=>dispatch(closeModal())}>&#10005;</ModalClose>
                <h1>I am a modal!</h1>
            </ModalContent>
        </ModalOverlay>
    );
}

// STYLE

const ModalOverlay = styled.div`
    position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ModalContent = styled.div`
    background-color: #ffffff;
    border: 1px solid #bebebe;
    border-radius: 2px;
    padding: 12px 16px;
    position: relative;
    height: 200px;
    width: 350px;
`;
const ModalClose = styled.span`
    position: absolute;
    right: 8px;
    top: 4px;
    font-size: 24px;
    cursor: pointer;
`;