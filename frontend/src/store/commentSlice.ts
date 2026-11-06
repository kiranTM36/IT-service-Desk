import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

interface commentData {
    ticketId : string,
    comment : string
}
interface cmtInfo {
  cmtId: number
  userId: number
  ticketId: number
  comment: string
  profile: string
  username: string
  createdAt: string
}

interface commentState {
    comment : cmtInfo[] | null,
    status : string
}

const initialState : commentState = {
    comment : null,
    status : ''
}

const commentSlice = createSlice({
    name : "comment", 
    initialState ,
    reducers : {
        setComment(state , action : PayloadAction<cmtInfo[] | null>){
            state.comment = action.payload
        },
        setStatus(state , action :PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setComment , setStatus } = commentSlice.actions
export default commentSlice.reducer

export function createComment (data: commentData){
    return async function createCommentThunk (dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        const response = await axios.post('http://localhost:9999/comment/add' , data , {
            withCredentials : true
        })

        if(response.status > 199 && response.status < 300){
            return true
        }
    }
}

export function getComment( id : Number){
    return async function getComment(dispatch:AppDispatch) {
     console.log(id);
     
        dispatch(setStatus(status.LOADING))

        const response = await axios.get(`http://localhost:9999/comment/${id}` , {
            withCredentials : true
        })

        dispatch(setComment(response.data.data))
    }
}