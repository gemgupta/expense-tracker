import { createSlice} from "@reduxjs/toolkit";

const initialState= {
isAuthenticated: !!localStorage.getItem('token'),
token: localStorage.getItem('token'),
email: localStorage.getItem('email')
}
export const authSlice= createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state)=>{
state.isAuthenticated=true
        },
        logout: (state)=>{
state.isAuthenticated=false;
state.token= null

        },
        setEmail:(state,action)=>{
state.email= action.payload;
localStorage.setItem('email', state.email)
        }
        ,
        setToken:(state,action)=>{
state.token= action.payload;
localStorage.setItem('token', state.token)
        }
    }
})

export default authSlice.reducer;
export const authActions= authSlice.actions