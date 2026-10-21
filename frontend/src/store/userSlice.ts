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
    id : number
    username: string
    email: string
    password: string
}

interface userState {
    users : userInfo[],
    user : userInfo | null,
    token : string
    status : string
}

const initialState : userState = {
    users : [],
    user : null,
    token : '',
    status: ''
}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setUsers (state , action : PayloadAction <userInfo[]>){
            state.users = action.payload
        },
        setUser (state , action : PayloadAction <userInfo>){
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

export function LoginAction(data : userData){
    return async function LoginThunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))
        try {
            const response = await axios.post('http://localhost:5555/user/login' ,data , {
                withCredentials : true
            })

            if(response.status >= 200 && response.status <300 ){
                dispatch(setUser(response.data.data))
                dispatch(setToken(response.data.token))
                dispatch(setStatus(status.SUCCESS))
            }
            
        } catch (error) {
            console.log(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
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
            dispatch(setStatus(status.ERRROR))
        } catch (error) {
            console.log(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
}