import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isAuthenticated: false,

    }, reducers: {
        setUserAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
})

export const { setUserAuth } = userSlice.actions
export default userSlice.reducer

