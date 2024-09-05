import { createSlice } from "@reduxjs/toolkit";

export const startedBookingSlice = createSlice({
    name: 'startedBookingSlice',
    initialState: {
        pickUpDate: '',
        dropOffDate: '',
        pickUpTime: '',
        dropOffTime: '',
        selectedProvince: '',
        selectedRegency: '',
    },
    reducers: {
        startedBookingUpdate: (state, action) => {
            state.pickUpDate = action.payload.pickUpDate
            state.dropOffDate = action.payload.pickUpDate
            state.pickUpTime = action.payload.pickUpTime
            state.dropOffTime = action.payload.dropOffTime
            state.selectedProvince = action.payload.selectedProvince
            state.selectedRegency = action.payload.selectedRegency
        },
    },
})

export const { startedBookingUpdate } = startedBookingSlice.actions
export default startedBookingSlice.reducer