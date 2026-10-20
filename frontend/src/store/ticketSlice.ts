import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

interface ticket{
    id : number
    title : string
    status : boolean
    priority : string
    category : string
    description : string
    username : string
    cName : string
    cId : number
}

interface ticketState {
    tickets : ticket[],
    ticket : ticket | null,
    status : string
}

const initialState : ticketState = {
    tickets : [],
    ticket : null,
    status : ''
}

const ticketSlice = createSlice({
    name : "ticket",
    initialState ,
    reducers : {
        setTickets(state , action : PayloadAction <ticket[]>){
            state.tickets = action.payload
        },
        setTicket(state , action :PayloadAction <ticket>){
            state.ticket = action.payload
        },
        setStatus(state , action : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const {setStatus , setTicket , setTickets} = ticketSlice.actions
export default ticketSlice.reducer

export function getAllTicket(){
    return async function getAllTicketThunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get('http://localhost:5555/ticket')

            if(response.status >= 200 || response.status < 300){
                dispatch(setTickets(response.data.data))
                dispatch(setStatus(status.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(status.ERRROR))
        }
    }
}