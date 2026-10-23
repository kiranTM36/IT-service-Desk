import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from './store'
import { status } from './status'
import axios from 'axios'

export interface ticket{
    tId : number
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
        clearTickets(state) {
            state.tickets = []
        },
        setTicket(state , action :PayloadAction <ticket>){
            state.ticket = action.payload
        },
        setStatus(state , action : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const {setStatus , setTicket , setTickets , clearTickets} = ticketSlice.actions
export default ticketSlice.reducer

export function getAllTicket(){
    return async function getAllTicketThunk(dispatch:AppDispatch) {
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get('http://localhost:9999/ticket' , {
                withCredentials : true
            })

            if(response.status >= 200 && response.status < 300){
                dispatch(setTickets(response.data.data))
                dispatch(setStatus(status.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(status.ERRROR))
        }
    }
}

export function getMyTicket(){
    return async function getMyTicketThunk(dispatch:AppDispatch) {
        try {
            const response =await axios.get('http://localhost:9999/ticket/my-tickets' , {
                withCredentials : true
            })

            if(response.status >= 200 && response.status < 300){
                dispatch(setTickets(response.data.data))
                dispatch(setStatus(status.SUCCESS))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
}

export function getSingleTicket(id : number){
    return async function getSinglTicketThunk( dispatch : AppDispatch){
        dispatch(setStatus(status.LOADING))

        try {
            const response = await axios.get(`http://localhost:9999/ticket/${id}` , {
                withCredentials : true
            })

            if(response.status >= 200 && response.status < 300){
                dispatch(setTicket(response.data.data))
                dispatch(setStatus(status.SUCCESS))
            }
        } catch (error) {
            console.error(error);
            dispatch(setStatus(status.ERRROR))
        }
    }
}