import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './categorySlice'
import ticketSlice from './ticketSlice'
import userSlice from './userSlice'
import commentSlice from './commentSlice' 
import teamSlice from './teamSlice'
import profileSlice from './profile'

export const store = configureStore({
    reducer : {
        categroy : categorySlice ,
        ticket : ticketSlice,
        user : userSlice ,
        comment : commentSlice,
        team : teamSlice,
        profile : profileSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch