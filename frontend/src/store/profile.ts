import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

interface profileData{
    bio : string,
    userId : number,
    phone : string
    address : string
    pId : number
}

interface profileState{
    profile : profileData | null
    status : string 
}

const initialState : profileState = {
    profile : null,
    status : ''
}

const profileSlice = createSlice({
    name : 'profile',
    initialState ,
    reducers : {
        setProfile(state , action : PayloadAction<profileData>){
            state.profile = action.payload
        },
        setStatus(state , action : PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setProfile , setStatus } = profileSlice.actions
export default profileSlice.reducer

export function getProfile(id : number){
    return async function getProfileTHunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get(`http://localhost:9999/profile/${id}`)
            dispatch(setProfile(response.data.data))
            dispatch(setStatus(status.SUCCESS))
        } catch (error) {
            console.error(error);
             dispatch(setStatus(status.ERRROR))
        }
    }
}