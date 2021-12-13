import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            console.log("modal opened")
            return{
                ...state,
                isOpen: true
            }
        },
        closeModal: (state) => {
            console.log("modal closed")
            return{
                ...state,
                isOpen: false
            }
        }
    }
});

export const selectModalState = (state) => state.modal.isOpen;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

