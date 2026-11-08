import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "./store"
import { status } from "./status"
import axios from "axios"

interface teamData {
    gId : number
    gName : string
    gDesc : string
    createdAt : Date
    username : string
}

interface FormData {
    gName : string
    gDesc : string
}

interface teamState {
    teams : teamData[],
    status : string
}

const initialState : teamState = {
    teams : [],
    status : '',
}

const teamSlice = createSlice({
    name : "team",
    initialState , 
    reducers : {
        setTeams (state , action :PayloadAction<teamData[]>){
            state.teams = action.payload
        },
        setStatus(state , action : PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const {setStatus , setTeams} = teamSlice.actions
export default teamSlice.reducer

export function getAllTeam(){
    return async function getTeamThunk(dispatch : AppDispatch){
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get('http://localhost:9999/team' , {
                withCredentials : true
            })

            dispatch(setTeams(response.data.data))
            dispatch(setStatus(status.SUCCESS))
        } catch (error) {
         dispatch(setStatus(status.ERRROR))
         console.log(error);
            
        }
    }
}

export function createTeam(data : FormData){
    return async function createTeamTHunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.post('http://localhost:9999/team/add' , data , {
                withCredentials : true
            }) 

            if(response.status === 200){
                alert('success')
                return true
            }
        } catch (error) {
            
        }
    }
} 