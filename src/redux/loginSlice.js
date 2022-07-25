import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:JSON.parse(localStorage.getItem('user')) || null
}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action) => {
     
        state.user = action.payload
      },
      
      logout: (state) => {
        state.user = null
      },
    },
})

export const {login , logout } = loginSlice.actions;
export const selectUser = (state) => state.user.user
export default loginSlice.reducer