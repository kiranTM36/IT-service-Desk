import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

export interface userData {
  username: string
  email: string
  password: string
}

interface userInfo {
    id: number;
    email: string;
    role: string;
    profile: string | null;
}

interface userState {
    users : userInfo[],
    user : userInfo | null,
    token : string | null
    status : string
}

const initialState : userState = {
    users : [],
    user : null,
    token : null,
    status: ''
}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setUsers (state , action : PayloadAction <userInfo[]>){
            state.users = action.payload
        },
        setUser (state , action : PayloadAction <userInfo | null>){
            console.log("setUser payload:", action.payload);
            state.user = action.payload
        },
        setToken (state , action : PayloadAction <string>){
            state.token = action.payload
        },
        setStatus (state , action : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const { setUser , setUsers , setToken , setStatus } = userSlice.actions
export default userSlice.reducer

export function LoginAction(data: userData) {
    return async function LoginThunk(dispatch: AppDispatch) {
        dispatch(setStatus(status.LOADING));

        try {
            const response = await axios.post(
                'http://localhost:5555/user/login',
                data,
                { withCredentials: true }
            );

            console.log("Response:", response.data);
            console.log("User:", response.data.data);
            console.log("Backend user:", response.data.data);

            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token));
            dispatch(setStatus(status.SUCCESS));

        } catch (error) {
            console.error("Login failed:", error);
            dispatch(setStatus(status.ERRROR));
        }
    };
}

export function signupAction(data : userData){
    return async function signUpThunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))
        try {
            const response = await axios.post('http://localhost/5555/signup' ,data)

            if(response.status >= 200 && response.status <300 ){
                dispatch(setStatus(status.SUCCESS))
            }
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
}

export function getAllUser(){
    return async function getAllUserThunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get('http://localhost:5555/user' , {
                withCredentials : true
            })

            if(response.status === 200){
                dispatch(setUsers(response.data.data))
                dispatch(setStatus(status.SUCCESS))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
}

export function logOutAction(){
    return async function logoutThunk(dispatch:AppDispatch) {
        console.log("clicked");
        
        try {
            const response = await axios.post('http://localhost:5555/user/logout', {}, {
                withCredentials : true
            })

            if(response.status === 200){
                dispatch(setUser(null))
            }
        } catch (error) {
            
        }
    }
}