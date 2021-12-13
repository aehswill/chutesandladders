import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transformTo: 1
}

export const dieSlice = createSlice({
    name: 'die',
    initialState,
    reducers: {
        setTransformTo: (state, action) => {
            state.transformTo = action.payload
        },
    }
});

export const selectTransformTo = (state) => state.die.transformTo;

export const { setTransformTo } = dieSlice.actions;

export default dieSlice.reducer;