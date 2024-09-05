import { createSlice } from "@reduxjs/toolkit";

export const carSlice = createSlice({
    name: "car",
    initialState: {
        id: null,
    },
    reducers: {
        carUpdate: (state, action) => {
            state.value = action.value
        }
    }
})

export const { carUpdate } = carUpdate.actions
export default carSlice.reducer