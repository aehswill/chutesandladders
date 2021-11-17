import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, selectModalState } from './modalSlice'
import styled from 'styled-components'

export default function Modal(props) {

    const dispatch = useDispatch();
    const isOpen = useSelector(selectModalState);
    const onClickHandle = ()=>dispatch(closeModal());

    if(!isOpen){
        return null;
    }

    const ModalContent = props.content;

    return(
        <ModalOverlay>
            <ModalContent close={onClickHandle}/>
        </ModalOverlay>
    );
}

// STYLE

const ModalOverlay = styled.div`
    z-index: 9;
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000040;
`;
